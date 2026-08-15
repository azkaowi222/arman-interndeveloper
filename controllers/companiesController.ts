import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getUsersApplied = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  try {
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Field required",
      });
    }
    const usersOnCompanie = await prisma.company.findMany({
      include: {
        user: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Users found on this company",
      usersOnCompanie,
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
