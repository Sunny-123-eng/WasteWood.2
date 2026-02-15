

# Phase 1 -- Core System and Transaction Modules

## Overview
Build the functional foundation of the Waste Wood Trading ERP as an offline-first mobile-optimized web app. This phase delivers daily usability: recording purchases, sales, and expenses with automatic cash/bank balance tracking.

---

## 1. Offline-First Data Layer

All data will be stored in the browser's **localStorage** using a custom hook/store pattern. No backend required for Phase 1 -- the app works entirely offline.

**Data stores to create:**
- Sawmills (master data)
- Parties/Clients (master data)
- Purchases (transactions)
- Sales (transactions)
- Expenses (transactions)
- Balances (cash and bank running totals)
- App Settings (profit split ratio, etc.)

Each store will have helper functions for CRUD operations with unique ID generation using timestamps.

---

## 2. Navigation and App Shell

A mobile-first bottom navigation bar with 5 tabs:

| Tab | Icon | Destination |
|-----|------|-------------|
| Home | Home | Dashboard |
| Purchase | ShoppingCart | New Purchase form |
| Sale | TrendingUp | New Sale form |
| Expense | Receipt | New Expense form |
| More | Menu | Settings, Master Data, History |

The layout will use a fixed bottom nav bar optimized for thumb reach on phones.

---

## 3. Master Data Management

### Sawmill Management
- Add/Edit sawmill with fields: Name, Default Rate
- List view with edit capability
- Accessible from "More" tab

### Party/Client Management
- Add/Edit party with fields: Name, Contact (optional)
- List view with edit capability
- Accessible from "More" tab

Both are used as dropdown sources in transaction forms.

---

## 4. Purchase Module (Sawmill Transactions)

**Form Fields:**
- Date (defaults to today, editable via date picker)
- Sawmill (dropdown -- auto-fills rate on selection)
- Rate per KG (auto-filled, editable)
- Quantity in KG
- Amount (auto-calculated: Quantity x Rate, read-only)
- Vehicle/Gadi Number
- Payment Mode: Cash / Bank / Credit (Udhaar)
- Notes (optional)

**Logic:**
- Cash/Bank selection updates respective balance (deduction)
- Credit creates an outstanding payable entry
- Amount is always auto-calculated

---

## 5. Sales Module (Party Transactions)

**Form Fields:**
- Date (defaults to today, editable)
- Party (dropdown)
- Rate per KG (manual entry)
- Quantity in KG
- Amount (auto-calculated, read-only)
- Vehicle/Gadi Number
- Bill Number (mandatory)
- Payment Mode: Cash / Bank / Credit
- Notes (optional)

**Logic:**
- Cash/Bank selection updates respective balance (addition)
- Credit creates an outstanding receivable entry

---

## 6. Expense Module

**Form Fields:**
- Date
- Expense Description
- Amount
- Paid By: Business / Sunny / Partner
- Payment Mode: Cash / Bank
- Linked Vehicle (optional)

**Logic:**
- Cash/Bank balance deducted
- "Paid By" field stored for partner settlement (Phase 3)

---

## 7. Dashboard (Basic)

A summary screen showing:
- Cash Balance
- Bank Balance
- Today's Purchases total
- Today's Sales total
- Today's Expenses total

Displayed as clean summary cards.

---

## Technical Details

### File Structure
```text
src/
  types/           -- TypeScript interfaces for all entities
  lib/
    storage.ts     -- localStorage helpers (get/set/delete)
  hooks/
    useStore.ts    -- Generic CRUD hook for localStorage
  components/
    Layout.tsx     -- App shell with bottom nav
    forms/
      PurchaseForm.tsx
      SaleForm.tsx
      ExpenseForm.tsx
    dashboard/
      DashboardCards.tsx
    master/
      SawmillList.tsx
      SawmillForm.tsx
      PartyList.tsx
      PartyForm.tsx
  pages/
    Index.tsx       -- Dashboard
    Purchase.tsx
    Sale.tsx
    Expense.tsx
    Settings.tsx    -- Master data + settings
    History.tsx     -- Transaction list
```

### Key Patterns
- All forms use react-hook-form with zod validation
- Auto-calculation via watched fields in forms
- Dropdown data sourced live from localStorage
- Currency formatted as Indian Rupees throughout
- Mobile-first responsive design using Tailwind
- All existing shadcn/ui components reused (Card, Form, Input, Select, Tabs, Sheet, etc.)

### Routes
- `/` -- Dashboard
- `/purchase` -- New Purchase
- `/sale` -- New Sale
- `/expense` -- New Expense
- `/settings` -- Master data management and app settings
- `/history` -- Transaction history with filters

