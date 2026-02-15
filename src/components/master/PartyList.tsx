import { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import type { Party } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function PartyList() {
  const { items, add, update } = useStore<Party>('ww_parties');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  function handleAdd() {
    if (!name.trim()) return;
    add({ name: name.trim(), contact: contact.trim() || undefined });
    setName(''); setContact(''); setAdding(false);
    toast.success('Party added');
  }

  function handleUpdate() {
    if (!editId || !name.trim()) return;
    update(editId, { name: name.trim(), contact: contact.trim() || undefined });
    setEditId(null); setName(''); setContact('');
    toast.success('Party updated');
  }

  function startEdit(p: Party) {
    setEditId(p.id); setName(p.name); setContact(p.contact || '');
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Parties / Clients</h3>
        {!adding && <Button size="sm" variant="outline" onClick={() => setAdding(true)}><Plus className="mr-1 h-4 w-4" />Add</Button>}
      </div>

      {(adding || editId) && (
        <Card><CardContent className="flex flex-col gap-2 p-3">
          <Input placeholder="Party name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Contact (optional)" value={contact} onChange={e => setContact(e.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" onClick={editId ? handleUpdate : handleAdd}><Check className="mr-1 h-4 w-4" />Save</Button>
            <Button size="sm" variant="ghost" onClick={() => { setAdding(false); setEditId(null); setName(''); setContact(''); }}><X className="mr-1 h-4 w-4" />Cancel</Button>
          </div>
        </CardContent></Card>
      )}

      {items.map(p => (
        <Card key={p.id}>
          <CardContent className="flex items-center justify-between p-3">
            <div>
              <p className="font-medium">{p.name}</p>
              {p.contact && <p className="text-sm text-muted-foreground">{p.contact}</p>}
            </div>
            <Button size="icon" variant="ghost" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
          </CardContent>
        </Card>
      ))}

      {items.length === 0 && !adding && <p className="text-center text-sm text-muted-foreground">No parties yet. Add one to get started.</p>}
    </div>
  );
}
