import { Link } from "react-router-dom";
import CompanyLayout from "../../components/company/CompanyLayout";

function CompanyDashboardPage() {
  return (
    <CompanyLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

            <p className="mt-1 text-sm text-slate-500">
              Kelola lowongan dan kandidat perusahaan Anda.
            </p>
          </div>

          <Link
            to="/company/jobs/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Buat Lowongan
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total Lowongan</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">12</p>

            <p className="mt-2 text-xs text-green-600">+2 bulan ini</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total Kandidat</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">148</p>

            <p className="mt-2 text-xs text-blue-600">Semua lowongan</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Reviewing</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">27</p>

            <p className="mt-2 text-xs text-yellow-600">Perlu ditinjau</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Accepted</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">8</p>

            <p className="mt-2 text-xs text-green-600">Kandidat diterima</p>
          </div>
        </div>

        {/* Quick action */}
        <div className="mt-8 rounded-2xl bg-blue-600 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">Butuh kandidat baru?</h2>

          <p className="mt-2 max-w-xl text-sm text-blue-100">
            Buat lowongan pekerjaan baru dan temukan kandidat terbaik untuk
            perusahaan Anda.
          </p>

          <Link
            to="/company/jobs/create"
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Buat Lowongan
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default CompanyDashboardPage;
