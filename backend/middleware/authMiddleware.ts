import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token sudah expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Token tidak valid",
      });
    }
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan pada server",
    });
  }
};
