export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Beneficiary {
  id: number;
  code: string;
  full_name: string;
  dob: string | null;
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  id_card: string | null;
  health_notes: string | null;
  status: 'active' | 'supported' | 'graduated' | 'inactive';
  support_type: string | null;
  notes: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  goal_amount: number;
  raised_amount: number;
  start_date: string | null;
  end_date: string | null;
  image: string | null;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: number;
  program_id: number | null;
  donor_name: string;
  donor_email: string | null;
  donor_phone: string | null;
  amount: number;
  payment_method: 'cash' | 'transfer' | 'other';
  transaction_date: string | null;
  receipt_number: string;
  notes: string | null;
  created_at: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  category: string | null;
  unit: string;
  quantity: number;
  min_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: number;
  item_id: number;
  type: 'import' | 'export';
  quantity: number;
  reference: string | null;
  recipient: string | null;
  notes: string | null;
  created_by: number;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  max_volunteers: number;
  status: 'open' | 'closed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: number;
  event_id: number;
  volunteer_name: string;
  volunteer_email: string | null;
  volunteer_phone: string | null;
  hours_worked: number;
  status: 'registered' | 'attended' | 'cancelled';
  registered_at: string;
}
