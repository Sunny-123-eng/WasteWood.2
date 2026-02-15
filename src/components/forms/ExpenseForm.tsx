import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '@/hooks/useStore';
import { useBalances } from '@/hooks/useBalances';
import { todayString } from '@/lib/format';
import type { Expense } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  date: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  amount: z.coerce.number().positive('Must be > 0'),
  paidBy: z.enum(['business', 'sunny', 'partner']),
  paymentMode: z.enum(['cash', 'bank']),
  linkedVehicle: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ExpenseForm() {
  const { add } = useStore<Expense>('ww_expenses');
  const { updateBalance } = useBalances();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { date: todayString(), description: '', amount: 0, paidBy: 'business', paymentMode: 'cash', linkedVehicle: '' },
  });

  function onSubmit(data: FormData) {
    add({
      date: data.date,
      description: data.description,
      amount: data.amount,
      paidBy: data.paidBy,
      paymentMode: data.paymentMode,
      linkedVehicle: data.linkedVehicle,
    });
    updateBalance(data.paymentMode, -data.amount);
    toast.success('Expense saved!');
    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="date" render={({ field }) => (
          <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="e.g. Diesel, Labour" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="amount" render={({ field }) => (
          <FormItem><FormLabel>Amount (₹)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="paidBy" render={({ field }) => (
          <FormItem><FormLabel>Paid By</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="sunny">Sunny</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
              </SelectContent>
            </Select><FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="paymentMode" render={({ field }) => (
          <FormItem><FormLabel>Payment Mode</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
              </SelectContent>
            </Select><FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="linkedVehicle" render={({ field }) => (
          <FormItem><FormLabel>Linked Vehicle (Optional)</FormLabel><FormControl><Input placeholder="Vehicle number" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <Button type="submit" className="w-full" size="lg">Save Expense</Button>
      </form>
    </Form>
  );
}
