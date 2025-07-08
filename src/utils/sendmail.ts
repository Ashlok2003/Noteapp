import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (to: string, otp: string): Promise<void> => {
  const mailOptions = {
    from: `Noteapp <${process.env.APP_OWNER}>`,
    to,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is:</p><h2>${otp}</h2><p>It is valid for 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
