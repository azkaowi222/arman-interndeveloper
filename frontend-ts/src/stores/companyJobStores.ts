import { create } from "zustand";
import type { CompanyJob } from "../models/CompanyJob";
import type { Company } from "../models/Company";

interface CompanyJobsState {
  company: Company | null;
  companyJobs: CompanyJob[];
  isLoading: boolean;

  setCompany: (company: Company) => void;
  setCompanyJobs: (companyJobs: CompanyJob[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCompanyJobStores = create<CompanyJobsState>((set) => ({
  company: null,
  companyJobs: [],
  isLoading: true,

  setCompany: (company) => {
    set({ company });
  },

  setCompanyJobs: (companyJobs) => {
    set({ companyJobs });
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
}));
