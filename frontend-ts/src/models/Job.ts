import type { Company } from "./Company";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";

export interface Job {
  id: number;
  companyId: number;
  company: Company;
  title: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: JobType;
  createdAt: string;
}
