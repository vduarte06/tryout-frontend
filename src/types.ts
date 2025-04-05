export interface Subscription {
  id: string;
  name: string;
  provider: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  cancellationUrl?: string;
  canCancelProgrammatically: boolean;
}

export interface User {
  email: string;
  subscriptions: Subscription[];
}