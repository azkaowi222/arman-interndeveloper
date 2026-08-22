import { useEffect, useMemo, useState } from "react";
import Navbar from "../../../components/Navbar";
import JobCard from "../../../components/JobCard";
import type { Job, JobType } from "../../../models/Job";
import { getAllJobs } from "../../../services/jobServices";
import { useJobStores } from "../../../stores/jobStores";

// const jobs: Job[] = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     companyId: 1,
//     company: "PT Teknologi Indonesia",
//     location: "Jakarta",
//     salaryMin: 6000000,
//     salaryMax: 9000000,
//     jobType: "FULL_TIME",
//     description:
//       "Kami sedang mencari Frontend Developer untuk bergabung dengan tim kami.",
//     requirements: [
//       "Menguasai React",
//       "Menguasai TypeScript",
//       "Memahami REST API",
//       "Memahami Git",
//     ],
//     postedAt: "2 hari yang lalu",
//   },
//   {
//     id: 2,
//     companyId: 2,
//     title: "Backend Developer",
//     company: "PT Digital Nusantara",
//     location: "Bandung",
//     salaryMin: 7000000,
//     salaryMax: 11000000,
//     jobType: "FULL_TIME",
//     description:
//       "Bergabung bersama tim backend untuk membangun sistem berskala besar.",
//     requirements: [
//       "Menguasai Node.js",
//       "Menguasai Express",
//       "Menguasai PostgreSQL",
//     ],
//     postedAt: "3 hari yang lalu",
//   },
//   {
//     id: 3,
//     companyId: 3,
//     title: "UI/UX Designer",
//     company: "Creative Studio",
//     location: "Jakarta",
//     salaryMin: 5000000,
//     salaryMax: 8000000,
//     jobType: "CONTRACT",
//     description:
//       "Mendesain interface dan pengalaman pengguna untuk produk digital.",
//     requirements: ["Menguasai Figma", "Memahami UI/UX", "Memiliki portfolio"],
//     postedAt: "5 hari yang lalu",
//   },
//   {
//     id: 4,
//     companyId: 4,
//     title: "Mobile Developer",
//     company: "PT Aplikasi Indonesia",
//     location: "Remote",
//     salaryMin: 7000000,
//     salaryMax: 12000000,
//     jobType: "FULL_TIME",
//     description: "Mengembangkan aplikasi mobile menggunakan Flutter.",
//     requirements: ["Menguasai Flutter", "Menguasai Dart", "Memahami REST API"],
//     postedAt: "1 minggu yang lalu",
//   },
// ];

const jobTypeLabels: Record<JobType, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

function HomePage() {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState<JobType | "ALL">("ALL");
  const setJobs = useJobStores((state) => state.setJobs);
  const setIsLoading = useJobStores((state) => state.setIsLoading);
  const jobs = useJobStores((state) => state.jobs);
  const isLoading = useJobStores((state) => state.isLoading);

  const processGetAllJobs = async () => {
    try {
      const jobs: Job[] = await getAllJobs();
      setJobs(jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        job.title.toLowerCase().includes(keyword) ||
        job.company?.companyName.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword);

      const matchType = jobType === "ALL" || job.jobType === jobType;

      return matchSearch && matchType;
    });
  }, [jobs, search, jobType]);

  useEffect(() => {
    processGetAllJobs();
  }, []);

  if (isLoading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        {/* subtle background accent */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="w-full">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 ring-1 ring-inset ring-blue-100">
              Temukan karier impianmu
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Temukan Pekerjaan
              <span className="text-blue-600"> yang Tepat</span> untukmu
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Temukan berbagai lowongan pekerjaan dari perusahaan terbaik dan
              mulai perjalanan kariermu.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50">
            <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
              <div className="flex items-center rounded-xl bg-slate-50 px-4 transition focus-within:ring-2 focus-within:ring-blue-500/40">
                <span className="mr-3 text-lg" aria-hidden="true">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari posisi, perusahaan, atau lokasi..."
                  className="w-full bg-transparent py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType | "ALL")}
                className="rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-600 outline-none transition focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="ALL">Semua tipe pekerjaan</option>
                {Object.entries(jobTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <button className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]">
                Cari
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Job List */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Lowongan Pekerjaan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Menampilkan{" "}
              <span className="font-semibold text-slate-700">
                {filteredJobs.length}
              </span>{" "}
              lowongan pekerjaan
            </p>
          </div>

          {jobType !== "ALL" && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Filter: {jobTypeLabels[jobType]}
              <button
                onClick={() => setJobType("ALL")}
                className="text-slate-400 transition hover:text-slate-700"
                aria-label="Hapus filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>

        {filteredJobs?.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="text-5xl" aria-hidden="true">
              🔍
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Lowongan tidak ditemukan
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Coba gunakan kata kunci lain atau ubah filter tipe pekerjaan.
            </p>

            {(search || jobType !== "ALL") && (
              <button
                onClick={() => {
                  setSearch("");
                  setJobType("ALL");
                }}
                className="mt-5 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Reset pencarian
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
