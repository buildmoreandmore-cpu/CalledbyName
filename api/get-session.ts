import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Payment system not configured' });
  }

  const { session_id } = req.query;

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    return res.status(200).json({
      orderId: `WN-${session.id.slice(-6).toUpperCase()}`,
      customerEmail: session.customer_email,
      customerName: session.metadata?.customerName,
      gender: session.metadata?.gender,
      format: session.metadata?.format,
      bibleVersion: session.metadata?.bibleVersion,
      amountTotal: session.amount_total,
      paymentStatus: session.payment_status,
    });

  } catch (error) {
    console.error('Get session error:', error);
    return res.status(500).json({ error: 'Failed to retrieve session' });
  }
}
