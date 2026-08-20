import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useApplicationStore } from "../../../stores/applicationStore";
import { useJobStores } from "../../../stores/jobStores";
import type { Application } from "../../../models/Application";
import { apply } from "../../../services/applicationService";
import type { ApplicationForm } from "../../../models/ApplicationForm";
import { formattedDate } from "../../../utils/formatDate";

// const jobs = [
//   {
//     id: 1,
//     userId: 2,
//     title: "Frontend Developer",
//     company: "PT Teknologi Indonesia",
//     location: "Jakarta",
//     salary: "Rp6.000.000 - Rp9.000.000",
//     type: "Full Time",
//     postedAt: "2 hari yang lalu",
//     description:
//       "Kami mencari Frontend Developer untuk bergabung dengan tim engineering dan mengembangkan aplikasi web modern.",
//     requirements: [
//       "Menguasai React",
//       "Menguasai TypeScript",
//       "Memahami REST API",
//       "Memahami Git",
//       "Memiliki kemampuan problem solving",
//     ],
//   },

//   {
//     id: 2,
//     userId: 3,
//     title: "Backend Developer",
//     company: "PT Digital Nusantara",
//     location: "Bandung",
//     salary: "Rp7.000.000 - Rp11.000.000",
//     type: "Full Time",
//     postedAt: "3 hari yang lalu",
//     description:
//       "Mengembangkan REST API dan sistem backend untuk kebutuhan perusahaan.",
//     requirements: [
//       "Menguasai Node.js",
//       "Menguasai Express",
//       "Menguasai PostgreSQL",
//       "Memahami Prisma",
//     ],
//   },
// ];

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobs = useJobStores((state) => state.jobs);

  const addApplication = useApplicationStore((state) => state.addApplication);

  const hasApplied = useApplicationStore((state) => state.hasApplied);

  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Lowongan tidak ditemukan
          </h1>

          <Link
            to="/home"
            className="mt-5 inline-block text-blue-600 hover:underline"
          >
            Kembali ke Lowongan
          </Link>
        </div>
      </div>
    );
  }

  const alreadyApplied = hasApplied(job.id);

  const handleApply = async () => {
    if (alreadyApplied) {
      return;
    }

    try {
      const applicationForm: ApplicationForm = {
        jobId: job.id,
        status: "APPLIED",
      };
      const application: Application = await apply(applicationForm);
      addApplication(application);
    } catch (error) {
      console.error(error);
    }

    // addApplication({
    //   jobId: job.id,
    //   job: job,
    //   // company: job.company.companyName,
    //   id: new Date().getTime(),
    //   status: "APPLIED",
    //   userId: job.company.userId,
    // });

    navigate("/applications");
  };

  const date = formattedDate(job.createdAt);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          ← Kembali ke Lowongan
        </Link>

        {/* Header */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600">
                {job.company.companyName.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium text-blue-600">
                  {job.company.companyName}
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  {job.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span>📍 {job.location}</span>
                  <span>💼 {job.jobType}</span>
                  <span>
                    💰 {job.salaryMin} - {job.salaryMax}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply */}
            <button
              onClick={handleApply}
              disabled={alreadyApplied}
              className={`shrink-0 rounded-xl px-7 py-3.5 text-sm font-semibold transition ${
                alreadyApplied
                  ? "cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {alreadyApplied ? "✓ Sudah Dilamar" : "Apply Job"}
            </button>
          </div>
        </section>

        {/* Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Deskripsi Pekerjaan
              </h2>

              <p className="mt-4 leading-7 text-slate-600">{job.description}</p>
            </section>

            {/* <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">Persyaratan</h2>

              <ul className="mt-5 space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex gap-3 text-slate-600">
                    <span className="mt-1 text-blue-600">✓</span>

                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </section> */}
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Ringkasan Pekerjaan</h3>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Perusahaan
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {job.company.companyName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Lokasi
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {job.location}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Gaji
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {job.salaryMin} - {job.salaryMax}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Tipe
                </p>

                <p className="mt-1 font-medium text-slate-700">{job.jobType}</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Diposting
                </p>

                <p className="mt-1 font-medium text-slate-700">{date}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default JobDetailPage;
