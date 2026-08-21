import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyLayout from "../../components/company/CompanyLayout";
import { createJob } from "../../services/jobServices";
import type { Job, JobType } from "../../models/Job";

function CreateJobPage() {
  const navigate = useNavigate();
  const { companyId } = useParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("FULL_TIME");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const job: Job = {
        companyId: Number(companyId),
        title,
        description,
        location,
        jobType: jobType as JobType,
        salaryMin: +salaryMin,
        salaryMax: +salaryMax,
      };
      const message = await createJob(job);
      console.log(message);
      navigate("/company/jobs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CompanyLayout>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Buat Lowongan Baru
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Publikasikan lowongan pekerjaan baru untuk menemukan kandidat
            terbaik.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Informasi Lowongan
            </h2>

            <div className="mt-6 grid gap-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Job Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Frontend Developer"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Location + Type */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Lokasi
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Jakarta"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tipe Pekerjaan
                  </label>

                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="FULL_TIME">Full Time</option>

                    <option value="PART_TIME">Part Time</option>

                    <option value="CONTRACT">Contract</option>

                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
              </div>

              {/* Salary */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Gaji Minimum
                  </label>

                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="6000000"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Gaji Maksimum
                  </label>

                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="9000000"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Deskripsi Pekerjaan
            </h2>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={7}
              placeholder="Jelaskan pekerjaan, tanggung jawab, dan posisi yang dibutuhkan..."
              required
              className="mt-5 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </section>

          {/* Requirements */}
          {/* <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Persyaratan</h2>

            <p className="mt-1 text-sm text-slate-500">
              Pisahkan setiap persyaratan menggunakan baris baru.
            </p>

            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={6}
              placeholder={
                "Menguasai React\nMenguasai TypeScript\nMemahami REST API\nMemahami Git"
              }
              required
              className="mt-5 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </section> */}

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/company/jobs")}
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Publikasikan Lowongan
            </button>
          </div>
        </form>
      </div>
    </CompanyLayout>
  );
}

export default CreateJobPage;
