import { create } from "zustand";
import type { CompanyJob } from "../models/CompanyJob";

interface companyJobsState {
  companyJobs: CompanyJob[];
  setCompanyJobs: (companyJobs: CompanyJob[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCompanyJobStores = create<companyJobsState>((set) => ({
  companyJobs: [],
  isLoading: true,
  setCompanyJobs: (companyJobs: CompanyJob[]) => {
    set({
      companyJobs: companyJobs,
    });
  },
  setIsLoading: (isLoading: boolean) => {
    set({
      isLoading: isLoading,
    });
  },
}));
