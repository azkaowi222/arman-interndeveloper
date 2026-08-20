import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export interface CompanieRequest extends Request {
  companyId?: number;
}

export const companyMiddleware = async (
  req: CompanieRequest,
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

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (user?.role !== "COMPANY") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    req.companyId = decoded.id;
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
