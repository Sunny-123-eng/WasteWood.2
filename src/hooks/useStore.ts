import { useState, useCallback } from 'react';
import { getItem, setItem, generateId } from '@/lib/storage';

export function useStore<T extends { id: string }>(key: string) {
  const [items, setItems] = useState<T[]>(() => getItem<T[]>(key, []));

  const persist = useCallback((next: T[]) => {
    setItems(next);
    setItem(key, next);
  }, [key]);

  const add = useCallback((item: Omit<T, 'id' | 'createdAt'>) => {
    const newItem = { ...item, id: generateId(), createdAt: new Date().toISOString() } as unknown as T;
    const next = [...getItem<T[]>(key, []), newItem];
    persist(next);
    return newItem;
  }, [key, persist]);

  const update = useCallback((id: string, updates: Partial<T>) => {
    const next = getItem<T[]>(key, []).map(i => i.id === id ? { ...i, ...updates } : i);
    persist(next);
  }, [key, persist]);

  const remove = useCallback((id: string) => {
    const next = getItem<T[]>(key, []).filter(i => i.id !== id);
    persist(next);
  }, [key, persist]);

  const refresh = useCallback(() => {
    setItems(getItem<T[]>(key, []));
  }, [key]);

  return { items, add, update, remove, refresh };
}
