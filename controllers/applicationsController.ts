import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const apply = async (req: Request, res: Response) => {
  const { userId, jobId, status } = req.body;

  try {
    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const isUserAlreadyApply = await prisma.application.findFirst({
      where: {
        userId,
        jobId,
      },
    });

    if (isUserAlreadyApply) {
      console.log({ isUserAlreadyApply });
      return res.status(400).json({
        success: false,
        message: "You have applied on this job",
      });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId,
        status,
      },
    });

    await prisma.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        status,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Sucesfully Applied",
      application,
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

export const updateApplications = async (req: Request, res: Response) => {
  const { applicationId } = req.params;
  const { status } = req.body;
  try {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const application = await prisma.application.update({
      data: {
        status,
      },
      where: {
        id: +applicationId,
      },
    });
    await prisma.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        status,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Application update successfully",
      application,
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

export const getApplicationById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: +userId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Application found successfully",
      applications,
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
