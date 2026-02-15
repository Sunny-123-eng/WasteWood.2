import ExpenseForm from '@/components/forms/ExpenseForm';

export default function ExpensePage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">New Expense</h1>
      <ExpenseForm />
    </div>
  );
}
