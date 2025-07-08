import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: { id: string };
  }
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      message: 'Not authorized, no token',
    } as const);
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'ashlokchaudhary',
    ) as JwtPayload & { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Not authorized, token failed',
    } as const);
  }
};
