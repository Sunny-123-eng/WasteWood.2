import SaleForm from '@/components/forms/SaleForm';

export default function SalePage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">New Sale</h1>
      <SaleForm />
    </div>
  );
}
