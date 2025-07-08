import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import { sendOtpEmail } from '../utils/sendmail';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface SignupRequest extends Request {
  body: {
    email: string;
    dob: string;
    name: string;
  };
}

interface VerifyOTPRequest extends Request {
  body: {
    email: string;
    otp: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface GoogleLoginRequest extends Request {
  body: {
    idToken: string;
  };
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const signup = async (req: SignupRequest, res: Response): Promise<void> => {
  const { email, dob, name } = req.body;

  if (!email || !dob || !name) {
    res.status(400).json({
      message: 'Email, Name and Date of Birth are required',
    } as const);
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'Email already in use', userId: existingUser.id } as const);
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      email,
      name,
      dob,
      otp,
      otpExpiry,
    });

    await sendOtpEmail(email, otp);

    res.status(201).json({
      message: 'OTP sent to email',
      userId: user._id!.toString(),
    } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};

export const verifyOTP = async (req: VerifyOTPRequest, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({
      message: 'Email and OTP are required',
    } as const);
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiry! < new Date()) {
      res.status(400).json({
        message: 'Invalid or expired OTP',
      } as const);
      return;
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id!.toString() } as CustomJwtPayload,
      process.env.JWT_SECRET || 'ashlokchaudhary',
      { expiresIn: '1h' },
    );
    res.status(200).json({
      message: 'Signup successful',
      name: user.name,
      dob: user.dob,
      token,
    } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};

export const login = async (req: LoginRequest, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: 'Email is required',
    } as const);
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' } as const);
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await User.updateOne(
      { email },
      {
        $set: {
          otp,
          otpExpiry,
        },
      },
    );

    await sendOtpEmail(email, otp);

    res.status(200).json({
      message: 'OTP Send Successfully !',
    } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};

export const googleLogin = async (req: GoogleLoginRequest, res: Response): Promise<void> => {
  const { idToken } = req.body;

  if (!idToken) {
    res.status(400).json({ message: 'idToken is required' } as const);
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email) {
      res.status(400).json({
        message: 'Invalid token payload',
      } as const);
      return;
    }

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        email: payload.email,
        googleId: payload.sub,
      });
    } else if (user.googleId && user.googleId !== payload.sub) {
      res.status(400).json({
        message: 'Account linked to a different Google account',
      } as const);
      return;
    }

    const token = jwt.sign(
      { id: user._id!.toString() } as CustomJwtPayload,
      process.env.JWT_SECRET || 'ashlokchaudhary',
      { expiresIn: '1h' },
    );
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email },
    } as const);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: (error as Error).message,
    } as const);
  }
};
