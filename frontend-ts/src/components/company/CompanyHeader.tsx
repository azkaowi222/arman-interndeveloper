import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { logout } from "../../services/authServices";

function CompanyHeader() {
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
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Mobile logo */}
      <div className="font-bold text-blue-600 lg:hidden">
        Indo<span className="text-slate-900">Kerja</span>
      </div>

      <div className="hidden lg:block">
        <h1 className="text-sm font-semibold text-slate-700">
          Company Dashboard
        </h1>
      </div>

      {/* User */}
      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-800">
            {user?.name ?? "Company"}
          </p>

          <p className="text-xs text-slate-500">Company</p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
          {user?.name?.charAt(0).toUpperCase() ?? "C"}
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default CompanyHeader;
