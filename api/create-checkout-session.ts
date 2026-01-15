import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

type GenderOption = 'male' | 'female' | 'neutral';
type ProductFormat = 'digital' | 'softcover' | 'hardcover' | 'leather';
type BibleVersion = 'web' | 'kjv';

interface CheckoutRequest {
  name: string;
  email: string;
  gender: GenderOption;
  format: ProductFormat;
  bibleVersion: BibleVersion;
}

const PRICING: Record<ProductFormat, number> = {
  digital: 2499,
  softcover: 3999,
  hardcover: 5999,
  leather: 8999,
};

const FORMAT_LABELS: Record<ProductFormat, string> = {
  digital: 'Digital Download (PDF)',
  softcover: 'Softcover Edition',
  hardcover: 'Hardcover Edition',
  leather: 'Premium Leather Bound',
};

const BIBLE_VERSION_NAMES: Record<BibleVersion, string> = {
  web: 'World English Bible',
  kjv: 'King James Version',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ error: 'Payment system not configured' });
  }

  try {
    const { name, email, gender, format, bibleVersion } = req.body as CheckoutRequest;

    if (!name || !email || !gender || !format || !bibleVersion) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Personalized Gospels - ${FORMAT_LABELS[format]}`,
              description: `Personalized for "${name}" | ${BIBLE_VERSION_NAMES[bibleVersion]} | ${gender === 'neutral' ? 'Beloved' : gender} pronouns`,
              images: ['https://calledbyname.com/book-preview.jpg'],
            },
            unit_amount: PRICING[format],
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerName: name,
        gender,
        format,
        bibleVersion,
      },
      success_url: `${baseUrl}/#/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#/create`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
