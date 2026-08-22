import type { Job } from "../models/Job";
import { getErrorMessage } from "../utils/errorMessage";
import backendUrl from "./apiService";

export const getAllJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(`${backendUrl}/jobs`);
    const data = await response.json();

    if (!response.ok) {
      throw Error(data["message"]);
    }

    const jobs: Job[] = data.jobs;
    return jobs;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

export const createJob = async (job: Job): Promise<string> => {
  try {
    const response = await fetch(`${backendUrl}/jobs/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw Error(data["message"]);
    }
    return data["message"] as string;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
