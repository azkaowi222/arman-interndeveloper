import { create } from "zustand";
import type { Job } from "../models/Job";

interface jobState {
  jobs: Job[];
  setJobs: (job: Job[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useJobStores = create<jobState>((set) => ({
  jobs: [],
  isLoading: true,
  setJobs: (jobs: Job[]) => {
    set({
      jobs: jobs,
    });
  },
  setIsLoading: (isLoading: boolean) => {
    set({
      isLoading: isLoading,
    });
  },
}));
