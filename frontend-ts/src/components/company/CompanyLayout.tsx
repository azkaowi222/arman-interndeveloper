import CompanyHeader from "./CompanyHeader";
import CompanySidebar from "./CompanySidebar";

function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <CompanySidebar />

        <div className="min-w-0 flex-1">
          <CompanyHeader />

          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default CompanyLayout;
