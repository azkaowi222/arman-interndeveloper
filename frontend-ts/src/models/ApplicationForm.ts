import type { ApplicationStatus } from "./Application";

export interface ApplicationForm {
  jobId: number;
  status: ApplicationStatus;
}
