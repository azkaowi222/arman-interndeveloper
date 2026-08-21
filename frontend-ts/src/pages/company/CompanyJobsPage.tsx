import { Link } from "react-router-dom";
import CompanyLayout from "../../components/company/CompanyLayout";
import { useEffect } from "react";
import type { CompanyJob } from "../../models/CompanyJob";
import { getAllJobs } from "../../services/companyServices";
import { useCompanyJobStores } from "../../stores/companyJobStores";
import { formattedDate } from "../../utils/formatDate";

// const jobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     location: "Jakarta",
//     type: "Full Time",
//     applicants: 24,
//     status: "Active",
//     createdAt: "18 Agustus 2026",
//   },
//   {
//     id: 2,
//     title: "Backend Developer",
//     location: "Bandung",
//     type: "Full Time",
//     applicants: 18,
//     status: "Active",
//     createdAt: "15 Agustus 2026",
//   },
//   {
//     id: 3,
//     title: "UI/UX Designer",
//     location: "Remote",
//     type: "Contract",
//     applicants: 31,
//     status: "Active",
//     createdAt: "10 Agustus 2026",
//   },
// ];

function CompanyJobsPage() {
  const setCompanyJobs = useCompanyJobStores((state) => state.setCompanyJobs);
  const isLoding = useCompanyJobStores((state) => state.isLoading);
  const setIsLoding = useCompanyJobStores((state) => state.setIsLoading);
  const jobs = useCompanyJobStores((state) => state.companyJobs);

  const processGetAllJobs = async (): Promise<void> => {
    try {
      const companyJobs: CompanyJob[] = await getAllJobs();
      setCompanyJobs(companyJobs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoding(false);
    }
  };
  useEffect(() => {
    processGetAllJobs();
  }, []);

  if (isLoding) {
    return <div>Loading jobs for this company...</div>;
  }

  return (
    <CompanyLayout>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Lowongan Saya</h1>

            <p className="mt-1 text-sm text-slate-500">
              Kelola semua lowongan pekerjaan perusahaan.
            </p>
          </div>

          <Link
            to={`/company/jobs/create/${jobs[0].companyId}`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Buat Lowongan
          </Link>
        </div>

        {/* Jobs */}
        <div className="mt-8 space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                    {job.title.charAt(0)}
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">{job.title}</h2>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>📍 {job.location}</span>

                      <span>💼 {job.jobType}</span>

                      <span>📅 {formattedDate(job.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
                    <p className="text-xs text-slate-400">Kandidat</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {job.applicants?.length}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-center text-xs font-semibold text-green-700">
                    {"Active"}
                  </span>

                  <Link
                    to={`/company/jobs/${job.id}/candidates`}
                    property={job.title}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Lihat Kandidat
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
}

export default CompanyJobsPage;
