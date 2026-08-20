import { NavLink } from "react-router-dom";

function CompanySidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="sticky top-0 h-screen">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div className="text-xl font-bold text-blue-600">
            Indo<span className="text-slate-900">Kerja</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-1 p-4">
          <NavLink
            to="/company"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <span>📊</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/company/jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <span>💼</span>
            Lowongan Saya
          </NavLink>

          <NavLink
            to="/company/jobs/create"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <span>➕</span>
            Buat Lowongan
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default CompanySidebar;
