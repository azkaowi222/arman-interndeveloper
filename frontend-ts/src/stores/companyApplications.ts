import { create } from "zustand";
import type { CompanyApplication } from "../models/CompanyApplication";

//DAFTAR LAMARAN

interface companyApplicationState {
  companyApplications: CompanyApplication[];
  jobTitle: string | null;
  setCompanyApplications: (companyApplication: CompanyApplication[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCompanyApplications = create<companyApplicationState>(
  (set) => ({
    companyApplications: [],
    isLoading: true,
    jobTitle: null,
    setCompanyApplications(companyApplications: CompanyApplication[]) {
      set({
        companyApplications: companyApplications,
      });
    },
    setIsLoading(isLoading: boolean) {
      set({
        isLoading: isLoading,
      });
    },
  }),
);
