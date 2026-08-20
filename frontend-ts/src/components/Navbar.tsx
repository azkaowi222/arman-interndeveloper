import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import { logout } from "../services/authServices";

function Navbar() {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      console.log("handlelogout");
      const isSucessLogout: boolean = await logout();
      if (!isSucessLogout) {
        console.error("Terjadi keslaahn saat logout");
        return;
      }

      console.log("logout");
      clearUser();
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          Indo<span className="text-slate-900   ">Kerja</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/home"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Lowongan
          </Link>

          <Link
            to="/applications"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Lamaran Saya
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>

            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            {user?.name?.charAt(0).toUpperCase() ?? "J"}
          </div>

          <button
            onClick={handleLogout}
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 md:block"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
