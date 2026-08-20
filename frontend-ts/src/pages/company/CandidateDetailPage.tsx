import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CompanyLayout from "../../components/company/CompanyLayout";
import StatusBadge from "../../components/company/StatusBadge";
import ApplicationHistory from "../../components/company/ApplicationHistory";
import type {
  ApplicationStatus,
  CompanyApplication,
} from "../../models/CompanyApplication";
import { useCompanyApplications } from "../../stores/companyApplications";
import {
  getApplicationById,
  updateApplicationStatus,
} from "../../services/applicationService";
import { formattedDate } from "../../utils/formatDate";

// const application: CompanyApplication = {
//   id: 2,
//   jobId: 1,
//   jobTitle: "Frontend Developer",

//   candidateName: "Budi Santoso",
//   candidateEmail: "budi@gmail.com",

//   appliedAt: "2026-08-17T10:00:00",

//   status: "REVIEWING",

//   history: [
//     {
//       id: 1,
//       status: "APPLIED",
//       changedAt: "2026-08-17T10:00:00",
//     },
//     {
//       id: 2,
//       status: "REVIEWING",
//       changedAt: "2026-08-18T08:00:00",
//       note: "CV sesuai dengan requirement",
//     },
//   ],
// };

function CandidateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [update, setIsUpdate] = useState(false);
  const setCompanyApplication = useCompanyApplications(
    (state) => state.setCompanyApplications,
  );
  const companyApplications = useCompanyApplications(
    (state) => state.companyApplications,
  );
  const [status, setStatus] = useState<ApplicationStatus>(
    companyApplications[0]?.status,
  );
  const isLoading = useCompanyApplications((state) => state.isLoading);
  const setIsLoading = useCompanyApplications((state) => state.setIsLoading);

  const handleUpdateStatus = async () => {
    if (status === companyApplications[0].status) {
      return;
    }

    // Nanti:
    await updateApplicationStatus(companyApplications[0], status);

    navigate(`/company/applications/${id}`);
    setIsUpdate(true);
  };

  const processGetApplicationById = async () => {
    try {
      const companyApplications: CompanyApplication[] =
        await getApplicationById(+id!);
      setCompanyApplication(companyApplications);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    processGetApplicationById();
  }, [update]);

  if (isLoading || companyApplications.length === 0) {
    return <p>Loading company application</p>;
  }
  return (
    <CompanyLayout>
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          to={`/company/jobs/${companyApplications[0].jobId}/candidates`}
          className="text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          ← Kembali ke Kandidat
        </Link>

        {/* Candidate Header */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                {companyApplications[0].candidateName.charAt(0)}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {companyApplications[0].candidateName}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {companyApplications[0].candidateEmail}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Melamar sebagai{" "}
                  <span className="font-semibold text-slate-700">
                    {companyApplications[0].jobTitle}
                  </span>
                </p>
              </div>
            </div>

            <StatusBadge status={status} />
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Candidate Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Informasi Kandidat
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Nama
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {companyApplications[0].candidateName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {companyApplications[0].candidateEmail}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Posisi
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {companyApplications[0].jobTitle}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Tanggal Lamar
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {formattedDate(companyApplications[0].appliedAt)}
                  </p>
                </div>
              </div>
            </section>

            {/* History */}
            <ApplicationHistory history={companyApplications[0].history} />
          </div>

          {/* Right */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Update Status</h2>

            <p className="mt-1 text-sm text-slate-500">Ubah status kandidat.</p>

            {/* Status */}
            <div className="mt-6 space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Status Kandidat
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="APPLIED">Applied</option>

                <option value="REVIEWING">Reviewing</option>

                <option value="SHORTLISTED">Shortlisted</option>

                <option value="REJECTED">Rejected</option>

                <option value="ACCEPTED">Accepted</option>
              </select>
            </div>

            {/* Note */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700">
                Catatan
                <span className="font-normal text-slate-400"> (opsional)</span>
              </label>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                placeholder="Tambahkan catatan perubahan status..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Update */}
            <button
              onClick={handleUpdateStatus}
              disabled={status === companyApplications[0].status}
              className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              Update Status
            </button>
          </aside>
        </div>
      </div>
    </CompanyLayout>
  );
}

export default CandidateDetailPage;
