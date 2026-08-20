import { create } from "zustand";
import type { Application } from "../models/Application";

interface ApplicationState {
  applications: Application[];

  addApplication: (application: Application) => void;

  hasApplied: (jobId: number) => boolean;

  clearApplications: () => void;

  setApplications: (application: Application[]) => void;
}

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  applications: [],

  addApplication: (application: Application) => {
    const exists = get().applications?.some(
      (item) => item.jobId === application.jobId,
    );

    if (exists) {
      return;
    }

    set((state) => ({
      applications: [...state.applications, application],
    }));
  },

  hasApplied: (jobId) => {
    return get().applications.some(
      (application) => application.jobId === jobId,
    );
  },

  setApplications: (applications: Application[]) => {
    set({
      applications: applications,
    });
  },

  clearApplications: () => {
    set({
      applications: [],
    });
  },
}));
