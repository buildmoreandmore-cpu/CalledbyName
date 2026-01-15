import type { VercelRequest, VercelResponse } from '@vercel/node';

type ProductFormat = 'digital' | 'softcover' | 'hardcover' | 'leather';
type BibleVersion = 'web' | 'kjv';
type GenderOption = 'male' | 'female' | 'neutral';

interface FulfillmentRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  personalization: {
    name: string;
    gender: GenderOption;
    bibleVersion: BibleVersion;
  };
  format: ProductFormat;
  shippingAddress: {
    name: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
}

// Lulu Pod Package IDs for different book formats
const LULU_POD_PACKAGES: Record<string, string> = {
  softcover: '0600X0900BWSTDPB060UW444MNG', // 6x9 B&W Standard Paperback
  hardcover: '0600X0900BWSTDCW060UW444MXX', // 6x9 B&W Hardcover Case Wrap
  leather: '0600X0900BWSTDCW060UW444MXX',   // Using hardcover for leather (custom binding later)
};

async function getLuluAccessToken(): Promise<string> {
  const clientId = process.env.LULU_CLIENT_ID;
  const clientSecret = process.env.LULU_CLIENT_SECRET;
  const apiUrl = process.env.LULU_API_URL || 'https://api.sandbox.lulu.com';

  if (!clientId || !clientSecret) {
    throw new Error('Lulu API credentials not configured');
  }

  const response = await fetch(`${apiUrl}/auth/realms/glasstree/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get Lulu access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createLuluPrintJob(
  accessToken: string,
  pdfUrl: string,
  coverUrl: string,
  podPackageId: string,
  shippingAddress: FulfillmentRequest['shippingAddress'],
  externalId: string
): Promise<any> {
  const apiUrl = process.env.LULU_API_URL || 'https://api.sandbox.lulu.com';

  const printJobData = {
    contact_email: process.env.FULFILLMENT_EMAIL || 'orders@calledbyname.com',
    external_id: externalId,
    line_items: [
      {
        external_id: `${externalId}-item-1`,
        printable_normalization: {
          cover: {
            source_url: coverUrl,
          },
          interior: {
            source_url: pdfUrl,
          },
          pod_package_id: podPackageId,
        },
        quantity: 1,
        title: 'Called by Name - Personalized Gospels',
      },
    ],
    production_delay: 120, // 2 minute delay to allow for cancellation
    shipping_address: {
      city: shippingAddress.city,
      country_code: shippingAddress.country || 'US',
      name: shippingAddress.name,
      phone_number: shippingAddress.phone || '',
      postcode: shippingAddress.postalCode,
      state_code: shippingAddress.state,
      street1: shippingAddress.street1,
      street2: shippingAddress.street2 || '',
    },
    shipping_level: 'MAIL', // Options: MAIL, PRIORITY_MAIL, GROUND, EXPEDITED, EXPRESS
  };

  const response = await fetch(`${apiUrl}/print-jobs/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(printJobData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Lulu print job: ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      orderId,
      customerEmail,
      customerName,
      personalization,
      format,
      shippingAddress,
    } = req.body as FulfillmentRequest;

    // Validate required fields
    if (!orderId || !customerEmail || !personalization || !format || !shippingAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Digital orders don't go to Lulu
    if (format === 'digital') {
      // TODO: Generate PDF and email to customer
      return res.status(200).json({
        success: true,
        type: 'digital',
        message: 'Digital order queued for email delivery',
      });
    }

    // Physical orders go to Lulu
    const podPackageId = LULU_POD_PACKAGES[format];
    if (!podPackageId) {
      return res.status(400).json({ error: `Unsupported format: ${format}` });
    }

    // Get Lulu access token
    const accessToken = await getLuluAccessToken();

    // Generate PDF URLs (these would be hosted files)
    // For now, using placeholder URLs - in production these would be:
    // 1. Generate personalized PDF via /api/generate-book-pdf
    // 2. Upload to cloud storage (S3, Cloudinary, etc.)
    // 3. Pass public URLs to Lulu
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://calledbyname.vercel.app';

    const interiorPdfUrl = `${baseUrl}/api/generate-book-pdf?name=${encodeURIComponent(personalization.name)}&gender=${personalization.gender}&version=${personalization.bibleVersion}&type=interior`;
    const coverPdfUrl = `${baseUrl}/api/generate-book-pdf?name=${encodeURIComponent(personalization.name)}&gender=${personalization.gender}&version=${personalization.bibleVersion}&type=cover`;

    // Create print job with Lulu
    const printJob = await createLuluPrintJob(
      accessToken,
      interiorPdfUrl,
      coverPdfUrl,
      podPackageId,
      shippingAddress,
      orderId
    );

    return res.status(200).json({
      success: true,
      type: 'physical',
      printJobId: printJob.id,
      status: printJob.status?.name || 'CREATED',
      message: 'Print job created successfully',
    });

  } catch (error: any) {
    console.error('Fulfillment error:', error);
    return res.status(500).json({
      error: 'Fulfillment failed',
      message: error.message,
    });
  }
}
