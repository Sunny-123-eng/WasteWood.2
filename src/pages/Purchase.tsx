import PurchaseForm from '@/components/forms/PurchaseForm';

export default function Purchase() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">New Purchase</h1>
      <PurchaseForm />
    </div>
  );
}
