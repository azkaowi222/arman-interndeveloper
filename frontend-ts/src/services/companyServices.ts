import type { CompanyJob } from "../models/CompanyJob";
import { getErrorMessage } from "../utils/errorMessage";
import backendUrl from "./apiService";

export const getAllCompanyJobs = async (): Promise<Record<string, any>> => {
  try {
    const response = await fetch(`${backendUrl}/companie/jobs`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data["message"]);
    }

    const company = data.company;

    const formattedCompanyJobs: CompanyJob[] = data.jobsWithApplicant.map(
      (job: any) => ({
        id: job.id,
        companyId: job.companyId,
        title: job.title,
        description: job.description,
        location: job.location,
        salaryMin: Number(job.salaryMin),
        salaryMax: Number(job.salaryMax),
        jobType: job.jobType,
        applicants: job.applicant.map((application: any) => application.user),
        createdAt: job.createdAt,
        isActive: true,
      }),
    );

    return {
      company,
      formattedCompanyJobs,
    };
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
