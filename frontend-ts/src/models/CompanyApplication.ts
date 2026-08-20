export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "REJECTED"
  | "ACCEPTED";

export interface ApplicationHistory {
  id: number;
  applicationId: number;
  status: ApplicationStatus;
  createdAt: string;
}

export interface CompanyApplication {
  id: number;
  jobId: number;
  jobTitle: string;

  candidateName: string;
  candidateEmail: string;

  appliedAt: string;
  status: ApplicationStatus;

  history: ApplicationHistory[];
}
