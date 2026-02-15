import SawmillList from '@/components/master/SawmillList';
import PartyList from '@/components/master/PartyList';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Settings & Master Data</h1>
      <SawmillList />
      <Separator />
      <PartyList />
    </div>
  );
}
