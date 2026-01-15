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

// Shipping rates for physical products
const SHIPPING_RATES: Record<string, number> = {
  standard: 599,  // $5.99 standard shipping
  express: 1299,  // $12.99 express shipping
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

    const isPhysicalProduct = format !== 'digital';

    // Build session configuration
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
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
    };

    // Add shipping for physical products
    if (isPhysicalProduct) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'CH'],
      };
      sessionConfig.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: SHIPPING_RATES.standard,
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 7 },
              maximum: { unit: 'business_day', value: 14 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: SHIPPING_RATES.express,
              currency: 'usd',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ];
      sessionConfig.phone_number_collection = {
        enabled: true,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
