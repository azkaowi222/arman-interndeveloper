import type { Job } from "./Job";

export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

export interface Application {
  id: number;
  jobId: number;
  userId: number;
  job: Job;
  status: ApplicationStatus;
}
