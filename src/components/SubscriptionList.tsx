import React from 'react';
import { Calendar, CreditCard, ExternalLink, RefreshCw, XCircle } from 'lucide-react';
import { Subscription } from '../types';

interface Props {
  subscriptions: Subscription[];
  onCancelSubscription: (subscription: Subscription) => void;
}

export function SubscriptionList({ subscriptions, onCancelSubscription }: Props) {
  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => (
        <div
          key={subscription.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                {subscription.name}
              </h3>
              <p className="text-neutral-500">{subscription.provider}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-neutral-800">
                {subscription.price} {subscription.currency}
              </p>
              <p className="text-neutral-500">
                {subscription.billingCycle === 'monthly' ? 'per month' : 'per year'}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-neutral-600">
            <Calendar className="w-4 h-4" />
            <span>Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
          </div>

          <div className="mt-4 flex gap-2">
            {subscription.canCancelProgrammatically ? (
              <button
                onClick={() => onCancelSubscription(subscription)}
                className="flex items-center gap-2 px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Cancel Subscription
              </button>
            ) : (
              <a
                href={subscription.cancellationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Cancellation Instructions
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}