import type { ApplicationHistory as History } from "../../models/CompanyApplication";

import StatusBadge from "./StatusBadge";

interface Props {
  history: History[];
}

function ApplicationHistory({ history }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Application History</h2>

      <p className="mt-1 text-sm text-slate-500">
        Riwayat perubahan status kandidat.
      </p>

      <div className="mt-8">
        {history.map((item, index) => (
          <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Line */}
            {index !== history.length - 1 && (
              <div className="absolute left-2.5 top-6 h-full w-px bg-slate-200" />
            )}

            {/* Dot */}
            <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-600 ring-1 ring-blue-100" />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={item.status} />

                <span className="text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleString("id-ID")}
                </span>
              </div>

              {/* {item.note && (
                <p className="mt-2 text-sm text-slate-600">{item.}</p>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ApplicationHistory;
