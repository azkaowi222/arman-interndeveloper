import type { User } from "./User";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";

export interface CompanyJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: JobType;
  applicants: User[];
  createdAt: string;
  isActive: boolean;
}
