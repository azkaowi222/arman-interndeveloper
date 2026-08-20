import { Link, useParams } from "react-router-dom";
import CompanyLayout from "../../components/company/CompanyLayout";
import StatusBadge from "../../components/company/StatusBadge";
import type { CompanyApplication } from "../../models/CompanyApplication";
import { getApplicationByJobId } from "../../services/applicationService";
import { useEffect } from "react";
import { useCompanyApplications } from "../../stores/companyApplications";
import { useCompanyJobStores } from "../../stores/companyJobStores";
import type { CompanyJob } from "../../models/CompanyJob";
import { formattedDate } from "../../utils/formatDate";

// const applications: CompanyApplication[] = [
//   {
//     id: 1,
//     jobId: 1,
//     jobTitle: "Frontend Developer",
//     candidateName: "Denny Eka",
//     candidateEmail: "denny@gmail.com",
//     appliedAt: "2026-08-18T10:00:00",
//     status: "APPLIED",
//     history: [
//       {
//         id: 1,
//         status: "APPLIED",
//         changedAt: "2026-08-18T10:00:00",
//       },
//     ],
//   },
//   {
//     id: 2,
//     jobId: 1,
//     jobTitle: "Frontend Developer",
//     candidateName: "Budi Santoso",
//     candidateEmail: "budi@gmail.com",
//     appliedAt: "2026-08-17T10:00:00",
//     status: "REVIEWING",
//     history: [
//       {
//         id: 1,
//         status: "APPLIED",
//         changedAt: "2026-08-17T10:00:00",
//       },
//       {
//         id: 2,
//         status: "REVIEWING",
//         changedAt: "2026-08-18T08:00:00",
//         note: "CV sesuai dengan requirement",
//       },
//     ],
//   },
//   {
//     id: 3,
//     jobId: 1,
//     jobTitle: "Frontend Developer",
//     candidateName: "Andi Wijaya",
//     candidateEmail: "andi@gmail.com",
//     appliedAt: "2026-08-16T10:00:00",
//     status: "SHORTLISTED",
//     history: [
//       {
//         id: 1,
//         status: "APPLIED",
//         changedAt: "2026-08-16T10:00:00",
//       },
//       {
//         id: 2,
//         status: "REVIEWING",
//         changedAt: "2026-08-17T08:00:00",
//       },
//       {
//         id: 3,
//         status: "SHORTLISTED",
//         changedAt: "2026-08-18T08:00:00",
//       },
//     ],
//   },
// ];

function CandidatesPage() {
  const { id } = useParams();
  const companyJobs = useCompanyJobStores((state) => state.companyJobs);
  const companyApplications = useCompanyApplications(
    (state) => state.companyApplications,
  );
  const setCompanyApplications = useCompanyApplications(
    (state) => state.setCompanyApplications,
  );

  const processGetApplicationByJobId = async () => {
    try {
      const companyApplications: CompanyApplication[] =
        await getApplicationByJobId(+id!);
      setCompanyApplications(companyApplications);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredApplications = companyApplications.filter(
    (application) => application.jobId === Number(id),
  );

  const job = companyJobs.filter((companyJob: CompanyJob) => {
    return companyJob.id === +id!;
  });

  useEffect(() => {
    processGetApplicationByJobId();
  }, []);

  return (
    <CompanyLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <Link
            to="/company/jobs"
            className="text-sm font-medium text-slate-500 hover:text-blue-600"
          >
            ← Kembali ke Lowongan
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Kandidat {job[0]?.title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {filteredApplications.length} kandidat melamar pada lowongan ini.
          </p>
        </div>

        {/* Filter */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
          <input
            type="text"
            placeholder="Cari nama kandidat..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
            <option>Semua Status</option>
            <option>Applied</option>
            <option>Reviewing</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
            <option>Accepted</option>
          </select>
        </div>

        {/* Candidates */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Kandidat
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Tanggal Lamar
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                          {application.candidateName.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {application.candidateName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {application.candidateEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {formattedDate(application.appliedAt)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={application.status} />
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        to={`/company/applications/${application.id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Lihat Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredApplications.map((application) => (
              <div key={application.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {application.candidateName.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {application.candidateName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {application.candidateEmail}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={application.status} />
                </div>

                <Link
                  to={`/company/applications/${application.id}`}
                  className="mt-4 block rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white"
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default CandidatesPage;
