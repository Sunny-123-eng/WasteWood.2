import DashboardCards from '@/components/dashboard/DashboardCards';

export default function Index() {
  return (
    <div className="p-4">
      <h1 className="mb-1 text-xl font-bold">Wood Trading ERP</h1>
      <p className="mb-4 text-sm text-muted-foreground">Today's overview</p>
      <DashboardCards />
    </div>
  );
}
