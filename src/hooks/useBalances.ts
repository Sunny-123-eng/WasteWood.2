import { useState, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import type { Balances } from '@/types';

const KEY = 'ww_balances';
const DEFAULT: Balances = { cash: 0, bank: 0 };

export function useBalances() {
  const [balances, setBalances] = useState<Balances>(() => getItem(KEY, DEFAULT));

  const persist = useCallback((next: Balances) => {
    setBalances(next);
    setItem(KEY, next);
  }, []);

  const updateBalance = useCallback((mode: 'cash' | 'bank', amount: number) => {
    const current = getItem<Balances>(KEY, DEFAULT);
    const next = { ...current, [mode]: current[mode] + amount };
    persist(next);
  }, [persist]);

  const refresh = useCallback(() => {
    setBalances(getItem(KEY, DEFAULT));
  }, []);

  return { balances, updateBalance, refresh };
}
