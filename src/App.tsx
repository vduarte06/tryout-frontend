import React, { useState, useEffect } from 'react';
import { CircleDollarSign } from 'lucide-react';
import { SubscriptionList } from './components/SubscriptionList';
import { AddSubscription } from './components/AddSubscription';
import type { Subscription, User } from './types';

function App() {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalSubscriptions = subscriptions.length;
  const totalCost = subscriptions.reduce((sum, sub) => {
    const monthlyAmount = sub.billingCycle === 'yearly' 
      ? sub.price / 12 
      : sub.price;
    return sum + monthlyAmount;
  }, 0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated API call to discover subscriptions
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscriptions([
        {
          id: '1',
          name: 'Netflix',
          provider: 'Netflix, Inc.',
          price: 15.99,
          currency: 'USD',
          billingCycle: 'monthly',
          nextBillingDate: '2024-04-15',
          cancellationUrl: 'https://netflix.com/cancel',
          canCancelProgrammatically: false,
        },
        {
          id: '2',
          name: 'Google One',
          provider: 'Google LLC',
          price: 1.99,
          currency: 'USD',
          billingCycle: 'monthly',
          nextBillingDate: '2024-04-01',
          canCancelProgrammatically: true,
        },
      ]);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubscription = (newSubscription: Omit<Subscription, 'id' | 'canCancelProgrammatically' | 'cancellationUrl'>) => {
    setSubscriptions([
      ...subscriptions,
      {
        ...newSubscription,
        id: Math.random().toString(36).substr(2, 9),
        canCancelProgrammatically: false,
      },
    ]);
  };

  const handleCancelSubscription = async (subscription: Subscription) => {
    if (!subscription.canCancelProgrammatically) return;

    try {
      // Simulated API call to cancel subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptions(subscriptions.filter(s => s.id !== subscription.id));
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-primary-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="w-8 h-8" />
            <h1 className="text-2xl font-bold">TryOut</h1>
          </div>
          <p className="mt-2 text-primary-100">Manage all your subscriptions in one place</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                Discover Your Subscriptions
              </h2>
              <form onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 w-full px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Discovering subscriptions...' : 'Continue'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-neutral-800">
                Your Subscriptions
              </h2>
              <p className="text-neutral-600">{email}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-neutral-800">Total Subscriptions</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">{totalSubscriptions}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-neutral-800">Monthly Cost</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">
                  ${totalCost.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <SubscriptionList
                subscriptions={subscriptions}
                onCancelSubscription={handleCancelSubscription}
              />
              <AddSubscription onAdd={handleAddSubscription} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;