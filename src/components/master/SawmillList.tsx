import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import type { Sawmill } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function SawmillList() {
  const { items, add, update } = useStore<Sawmill>('ww_sawmills');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');

  function handleAdd() {
    if (!name.trim()) return;
    add({ name: name.trim(), defaultRate: Number(rate) || 0 });
    setName(''); setRate(''); setAdding(false);
    toast.success('Sawmill added');
  }

  function handleUpdate() {
    if (!editId || !name.trim()) return;
    update(editId, { name: name.trim(), defaultRate: Number(rate) || 0 });
    setEditId(null); setName(''); setRate('');
    toast.success('Sawmill updated');
  }

  function startEdit(s: Sawmill) {
    setEditId(s.id); setName(s.name); setRate(String(s.defaultRate));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Sawmills</h3>
        {!adding && <Button size="sm" variant="outline" onClick={() => setAdding(true)}><Plus className="mr-1 h-4 w-4" />Add</Button>}
      </div>

      {(adding || editId) && (
        <Card><CardContent className="flex flex-col gap-2 p-3">
          <Input placeholder="Sawmill name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Default rate (₹/KG)" type="number" value={rate} onChange={e => setRate(e.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" onClick={editId ? handleUpdate : handleAdd}><Check className="mr-1 h-4 w-4" />Save</Button>
            <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setEditId(null); setName(''); setRate(''); }}><X className="mr-1 h-4 w-4" />Cancel</Button>
          </div>
        </CardContent></Card>
      )}

      {items.map(s => (
        <Card key={s.id}>
          <CardContent className="flex items-center justify-between p-3">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-muted-foreground">₹{s.defaultRate}/KG</p>
            </div>
            <Button size="icon" variant="ghost" onClick={() => startEdit(s)}><Pencil className="h-4 w-4" /></Button>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && !adding && <p className="text-center text-sm text-muted-foreground">No sawmills yet. Add one to get started.</p>}
    </div>
  );
}
