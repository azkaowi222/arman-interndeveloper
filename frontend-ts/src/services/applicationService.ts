import type { Application } from "../models/Application";
import type { ApplicationForm } from "../models/ApplicationForm";
import type { CompanyApplication } from "../models/CompanyApplication";
import { getErrorMessage } from "../utils/errorMessage";
import backendUrl from "./apiService";

export const apply = async (
  applicationForm: ApplicationForm,
): Promise<Application> => {
  try {
    const response = await fetch(`${backendUrl}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationForm),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data["message"]);
    }

    const application: Application = data.application;
    return application;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

export const getAllApplications = async (): Promise<Application[]> => {
  try {
    const response = await fetch(`${backendUrl}/applications`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data["message"]);
    }

    const applications: Application[] = data.applicationWithHistories;

    return applications;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

//mencari kandidat yang melamar berdasarkan id job
export const getApplicationByJobId = async (
  jobId: number,
): Promise<CompanyApplication[]> => {
  try {
    const response = await fetch(`${backendUrl}/applications/${jobId}`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data["message"]);
    }

    const companyApplications: CompanyApplication[] =
      data.applicationWithHistories;
    const formattedCompanyApplicattions: CompanyApplication[] =
      companyApplications.map((companyApplication: any) => {
        return {
          id: companyApplication.id,
          candidateEmail: companyApplication.user.email,
          candidateName: companyApplication.user.name,
          history: [],
          jobId: companyApplication.job.id,
          appliedAt: companyApplication.appliedAt,
          status: companyApplication.status,
          jobTitle: companyApplication.job.title,
        };
      });

    return formattedCompanyApplicattions;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

export const getApplicationById = async (
  Id: number,
): Promise<CompanyApplication[]> => {
  try {
    const response = await fetch(`${backendUrl}/applications/id/${Id}`, {
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw Error(data["message"]);
    }

    const companyApplications: CompanyApplication[] =
      data.applicationWithHistories;
    const formattedCompanyApplicattions: CompanyApplication[] =
      companyApplications.map((companyApplication: any) => {
        return {
          id: companyApplication.id,
          candidateEmail: companyApplication.user.email,
          candidateName: companyApplication.user.name,
          history: companyApplication.history,
          jobId: companyApplication.job.id,
          appliedAt: companyApplication.appliedAt,
          status: companyApplication.status,
          jobTitle: companyApplication.job.title,
        };
      });
    console.log(formattedCompanyApplicattions);
    return formattedCompanyApplicattions;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

export const updateApplicationStatus = async (
  application: CompanyApplication,
  status: string,
): Promise<string> => {
  try {
    const response = await fetch(
      `${backendUrl}/applications/${application.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw Error(data["message"]);
    }
    return data.message as string;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
