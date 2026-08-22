import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { CompanieRequest } from "../middleware/companyMiddleware";

export const getUsersApplied = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  try {
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Field required",
      });
    }
    const usersOnCompanie = await prisma.job.findMany({
      where: {},
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

export const getJobsByCompaniId = async (
  req: CompanieRequest,
  res: Response,
) => {
  const companyId = req.companyId;

  try {
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Id company must be provided",
      });
    }
    const company = await prisma.company.findUnique({
      where: {
        id: +companyId,
      },
    });
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
      where: {
        companyId: +companyId,
      },
    });

    const jobsWithApplicant = [];

    for (const job of jobs) {
      const applicant = await prisma.application.findMany({
        where: {
          jobId: job.id,
        },
        include: {
          user: true,
        },
      });
      jobsWithApplicant.push({
        ...job,
        applicant,
      });
    }

    console.log(company);

    return res.status(200).json({
      success: true,
      company: company,
      jobsWithApplicant,
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
