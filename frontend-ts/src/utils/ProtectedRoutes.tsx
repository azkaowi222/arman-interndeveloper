import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore";

interface ProtectedRouteProps {
  allowedRole: "COMPANY" | "JOB_SEEKER";
}

function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);

  console.log({ isAuthenticatedFromProtectRoutes: isAuthenticated });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role tidak sesuai
  //misal jika role jobseeker akses ke route company
  if (user.role !== allowedRole) {
    console.log(user.role);
    if (user.role === "COMPANY") {
      return <Navigate to="/company" replace />;
    }

    console.log("protected rputes /home");

    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
