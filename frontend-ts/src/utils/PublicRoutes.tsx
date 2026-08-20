import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore";

function PublicRoutes() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);
  const user = useUserStore((state) => state.user);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  console.log({ isAuthenticatedFromPublicRoutes: isAuthenticated });

  return isAuthenticated ? (
    <Navigate to={user?.role === "COMPANY" ? "/company" : "/home"} />
  ) : (
    <Outlet />
  );
}

export default PublicRoutes;
