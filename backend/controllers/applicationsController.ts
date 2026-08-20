import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export const apply = async (req: AuthRequest, res: Response) => {
  const { jobId, status } = req.body;

  try {
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
    });

    if (user?.role === "COMPANY") {
      return res.status(403).json({
        success: false,
        message: "Only Jobseeker can be apply",
      });
    }

    const isUserAlreadyApply = await prisma.application.findFirst({
      where: {
        userId: req.user?.id,
        jobId,
      },
    });

    if (isUserAlreadyApply) {
      return res.status(400).json({
        success: false,
        message: "You have applied on this job",
      });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: req.user?.id,
        status,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
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

export const getApplicationByJobId = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const applications = await prisma.application.findMany({
      where: {
        jobId: +jobId,
      },
      include: {
        job: true,
        user: true,
      },
    });
    const applicationWithHistories = [];
    for (const application of applications) {
      const history = await prisma.applicationStatusHistory.findMany({
        where: {
          applicationId: application.id,
        },
      });

      applicationWithHistories.push({
        ...application,
        history,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Application found successfully",
      applicationWithHistories,
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
  const { applicationId } = req.params;

  try {
    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const applications = await prisma.application.findMany({
      where: {
        id: +applicationId,
      },
      include: {
        job: true,
        user: true,
      },
    });
    const applicationWithHistories = [];
    for (const application of applications) {
      const history = await prisma.applicationStatusHistory.findMany({
        where: {
          applicationId: application.id,
        },
      });

      applicationWithHistories.push({
        ...application,
        history,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Application found successfully",
      applicationWithHistories,
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

export const getAllApplications = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  try {
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const applications = await prisma.application.findMany({
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      where: {
        userId: user.id,
      },
    });

    const applicationWithHistories = [];
    for (const application of applications) {
      const history = await prisma.applicationStatusHistory.findMany({
        where: {
          applicationId: application.id,
        },
      });

      applicationWithHistories.push({
        ...application,
        history,
      });
    }
    return res.status(200).json({
      success: true,
      applicationWithHistories,
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
