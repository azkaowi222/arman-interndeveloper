import { Link } from "react-router-dom";
import type { Job } from "../models/Job";

interface JobCardProps {
  job: Job;
}

function formatSalary(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
          {job.company?.companyName.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {job.title}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {job.company?.companyName}
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            📍
          </span>

          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            💰
          </span>

          <span>
            {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            💼
          </span>

          <span>{job.jobType.replace("_", " ")}</span>
        </div>
      </div>

      {/* Button */}
      <Link
        to={`/jobs/${job.id}`}
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Lihat Detail
      </Link>
    </article>
  );
}

export default JobCard;
