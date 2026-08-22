import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.SECRET_KEY!,
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan pada server",
    });
  }
};

export const verifyToken = (req: Request, res: Response) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY!,
      (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid signature",
          });
        }
        return res.status(200).json({
          success: true,
          decoded,
        });
      },
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan pada server",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan pada server",
    });
  }
};
