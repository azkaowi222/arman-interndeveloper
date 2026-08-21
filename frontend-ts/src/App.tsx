import LoginPage from "./pages/jobseeker/auth/LoginPage";
import HomePage from "./pages/jobseeker/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import JobDetailPage from "./pages/jobseeker/job/JobDetailPage";
import ApplicationsPage from "./pages/jobseeker/application/ApplicationsPage";

import CompanyDashboardPage from "./pages/company/CompanyDashboardPage";
import CompanyJobsPage from "./pages/company/CompanyJobsPage";
import CreateJobPage from "./pages/company/CreateJobPage";
import CandidatesPage from "./pages/company/CandidatesPage";
import CandidateDetailPage from "./pages/company/CandidateDetailPage";

import ProtectedRoute from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";

import { useEffect } from "react";
import type { User } from "./models/User";
import { verifyToken } from "./services/authServices";
import useUserStore from "./stores/userStore";

function App() {
  const setIsLoading = useUserStore((state) => state.setLoading);

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const processVerifyToken = async (): Promise<void> => {
      console.log("verif token berjalan");
      setIsLoading(true);

      try {
        const user: null | User = await verifyToken();

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    processVerifyToken();
  }, [setIsLoading, setUser]);

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* JOB SEEKER */}
        <Route element={<ProtectedRoute allowedRole="JOB_SEEKER" />}>
          <Route path="/home" element={<HomePage />} />

          <Route path="/jobs/:id" element={<JobDetailPage />} />

          <Route path="/applications" element={<ApplicationsPage />} />
        </Route>

        {/* COMPANY */}
        <Route element={<ProtectedRoute allowedRole="COMPANY" />}>
          <Route path="/company" element={<CompanyDashboardPage />} />

          <Route path="/company/jobs" element={<CompanyJobsPage />} />

          <Route path="/company/jobs/create/:companyId" element={<CreateJobPage />} />

          <Route
            path="/company/jobs/:id/candidates"
            element={<CandidatesPage />}
          />

          <Route
            path="/company/applications/:id"
            element={<CandidateDetailPage />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
