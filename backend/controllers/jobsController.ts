import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import { CompanieRequest } from "../middleware/companyMiddleware";

export const addJob = async (req: CompanieRequest, res: Response) => {
  const { title, description, location, jobType, salaryMin, salaryMax } =
    req.body;
  const companyId = req.companyId;

  
  try {
    if (!companyId || !title || !description || !location || !jobType) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const job = await prisma.job.create({
      data: {
        companyId,
        title,
        description,
        location,
        jobType,
        salaryMin,
        salaryMax,
      },
    });
    return res.status(201).json({
      success: true,
      message: "job create succesfully",
      job,
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

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
    });
    // console.log(jobs);
    return res.status(200).json({
      success: true,
      jobs,
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

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const {
      companyId,
      title,
      description,
      location,
      jobType,
      salaryMin,
      salaryMax,
    } = req.body;

    if (
      !jobId ||
      !companyId ||
      !title ||
      !description ||
      !location ||
      !jobType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const jobIsExist = await prisma.job.findUnique({
      where: {
        id: +jobId,
      },
    });

    if (!jobIsExist) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }
    const job = await prisma.job.update({
      data: {
        companyId,
        title,
        description,
        location,
        jobType,
        salaryMin,
        salaryMax,
      },
      where: {
        id: +jobId,
      },
    });
    return res.status(200).json({
      success: true,
      message: "job updated successfully",
      job,
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

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const jobIsExist = await prisma.job.findUnique({
      where: {
        id: +jobId,
      },
    });

    if (!jobIsExist) {
      return res.status(404).json({
        success: false,
        message: "job not found",
      });
    }

    await prisma.job.delete({
      where: {
        id: +jobId,
      },
    });

    return res.status(204).json({
      success: true,
      message: "job has been deteled",
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

export const getJobsById = async (req: Request, res: Response) => {
  const { jobId } = req.params;

  try {
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Field required",
      });
    }
    const job = await prisma.job.findUnique({
      where: {
        id: +jobId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Job found",
      job,
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
