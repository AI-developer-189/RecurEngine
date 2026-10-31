export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
  createdAt: Date;
  updatedAt: Date;
  invoices?: Invoice[];
  subscriptions?: Subscription[];
}

export interface Invoice {
  id: string;
  uniqueIdentifier: string;
  customerId: string;
  subscriptionId?: string;
  status: 'DRAFT' | 'CONFIRMED' | 'PAID';
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  discountApplied?: number;
  notes?: string;
  payments?: Payment[];
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  paymentDate: Date;
  note?: string;
}

export interface Subscription {
  id: string;
  uniqueIdentifier: string;
  customerId: string;
  planId: string;
  startDate: Date;
  expiryDate?: Date;
  status: 'Draft' | 'Quotation' | 'Confirmed' | 'Active' | 'Closed';
  paymentTerms?: string;
  taxRate: number;
  notes?: string;
  lineItems?: LineItem[];
  invoices?: Invoice[];
  payments?: Payment[];
}

export interface LineItem {
  id: string;
  subscriptionId: string;
  productId?: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  taxAmount: number;
  totalAmount: number;
  discountApplied?: number;
}

export interface Product {
  id: string;
  name: string;
  type?: string;
  salesPrice: number;
  costPrice: number;
  notes?: string;
  variants?: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface Plan {
  id: string;
  name: string;
  billingFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  minimumQuantity: number;
  dateAvailability?: Date;
  closeAutomatically: boolean;
  canBeManuallyClosed: boolean;
  canBePaused: boolean;
  canBeRenewed: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  subscriptions?: Subscription[];
}

export interface Discount {
  id: string;
  code: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number;
  minPurchaseAmount: number;
  minQuantity: number;
  startDate: Date;
  endDate: Date;
  maxUsages?: number;
  currentUsages: number;
  status: 'ACTIVE' | 'EXPIRED' | 'DEPLETED';
  applicableTo: 'global' | string[]; // "global" or product IDs
  createdById: string;
  createdBy?: User;
  subscriptions?: Subscription[];
}