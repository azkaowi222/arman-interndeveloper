import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import StatusBadge from "../../../components/StatusBadge";
import { useApplicationStore } from "../../../stores/applicationStore";
import type { Application } from "../../../models/Application";
import { getAllApplications } from "../../../services/applicationService";
import { useEffect } from "react";

function ApplicationsPage() {
  const applications = useApplicationStore((state) => state.applications);
  const setApplications = useApplicationStore((state) => state.setApplications);

  const processGetAllApplications = async () => {
    try {
      const applications: Application[] = await getAllApplications();
      setApplications(applications);
      console.log(applications);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    processGetAllApplications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lamaran Saya</h1>

          <p className="mt-2 text-slate-500">
            Pantau semua pekerjaan yang telah Anda lamar.
          </p>
        </div>

        {/* Content */}
        {applications.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              📄
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Belum ada lamaran
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Anda belum melamar pekerjaan apapun. Temukan pekerjaan yang sesuai
              dengan keahlian Anda.
            </p>

            <Link
              to="/home"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Cari Lowongan
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                      {application.job.company?.companyName.charAt(0)}
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {application.job.title}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {application.job.company?.companyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 md:flex-col md:items-end">
                    <StatusBadge status={application.status} />

                    <Link
                      to={`/jobs/${application.jobId}`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Lihat Lowongan →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ApplicationsPage;
