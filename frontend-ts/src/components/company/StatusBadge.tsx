import type { ApplicationStatus } from "../../models/CompanyApplication";

interface Props {
  status: ApplicationStatus;
}

const config = {
  APPLIED: {
    label: "Applied",
    className: "bg-blue-50 text-blue-700",
  },

  REVIEWING: {
    label: "Reviewing",
    className: "bg-yellow-50 text-yellow-700",
  },

  SHORTLISTED: {
    label: "Shortlisted",
    className: "bg-purple-50 text-purple-700",
  },

  REJECTED: {
    label: "Rejected",
    className: "bg-red-50 text-red-700",
  },

  ACCEPTED: {
    label: "Accepted",
    className: "bg-green-50 text-green-700",
  },
};

function StatusBadge({ status }: Props) {
  const item = config[status];
  if (item === null || item === undefined) {
    return;
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}
    >
      {item.label}
    </span>
  );
}

export default StatusBadge;
