import { Card, CardContent } from '@/components/ui/card';
import { useBalances } from '@/hooks/useBalances';
import { useStore } from '@/hooks/useStore';
import { formatCurrency, todayString } from '@/lib/format';
import type { Purchase, Sale, Expense } from '@/types';
import { Wallet, Landmark, ShoppingCart, TrendingUp, Receipt } from 'lucide-react';

export default function DashboardCards() {
  const { balances } = useBalances();
  const { items: purchases } = useStore<Purchase>('ww_purchases');
  const { items: sales } = useStore<Sale>('ww_sales');
  const { items: expenses } = useStore<Expense>('ww_expenses');

  const today = todayString();
  const todayPurchases = purchases.filter(p => p.date === today).reduce((s, p) => s + p.amount, 0);
  const todaySales = sales.filter(s => s.date === today).reduce((a, s) => a + s.amount, 0);
  const todayExpenses = expenses.filter(e => e.date === today).reduce((a, e) => a + e.amount, 0);

  const cards = [
    { label: 'Cash Balance', value: balances.cash, icon: Wallet, color: 'text-primary' },
    { label: 'Bank Balance', value: balances.bank, icon: Landmark, color: 'text-accent' },
    { label: "Today's Purchases", value: todayPurchases, icon: ShoppingCart, color: 'text-destructive' },
    { label: "Today's Sales", value: todaySales, icon: TrendingUp, color: 'text-success' },
    { label: "Today's Expenses", value: todayExpenses, icon: Receipt, color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} className="overflow-hidden">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`rounded-lg bg-muted p-2.5 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-bold tracking-tight">{formatCurrency(value)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
