import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

async function triggerFulfillment(
  session: Stripe.Checkout.Session,
  stripe: Stripe
): Promise<void> {
  const { customerName, gender, format, bibleVersion } = session.metadata || {};

  if (!customerName || !format) {
    console.error('Missing metadata for fulfillment');
    return;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://calledbyname.vercel.app';

  // Get shipping address from Stripe session if physical order
  let shippingAddress = null;
  if (format !== 'digital' && session.shipping_details) {
    const addr = session.shipping_details.address;
    shippingAddress = {
      name: session.shipping_details.name || customerName,
      street1: addr?.line1 || '',
      street2: addr?.line2 || '',
      city: addr?.city || '',
      state: addr?.state || '',
      postalCode: addr?.postal_code || '',
      country: addr?.country || 'US',
      phone: session.customer_details?.phone || '',
    };
  }

  const fulfillmentData = {
    orderId: `WN-${session.id.slice(-8).toUpperCase()}`,
    customerEmail: session.customer_email,
    customerName,
    personalization: {
      name: customerName,
      gender: gender || 'neutral',
      bibleVersion: bibleVersion || 'web',
    },
    format,
    shippingAddress,
  };

  try {
    const response = await fetch(`${baseUrl}/api/fulfill-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fulfillmentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fulfillment API error:', errorText);
    } else {
      const result = await response.json();
      console.log('Fulfillment triggered:', result);
    }
  } catch (error) {
    console.error('Failed to trigger fulfillment:', error);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    console.error('Stripe configuration missing');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
  });

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('Order completed:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        metadata: session.metadata,
        amountTotal: session.amount_total,
        shippingDetails: session.shipping_details,
      });

      // Trigger fulfillment
      await triggerFulfillment(session, stripe);

      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
