
export type GenderOption = 'male' | 'female' | 'neutral';

export type ProductFormat = 'digital' | 'softcover' | 'hardcover' | 'leather';

export type BibleVersion = 'web' | 'kjv';

export interface PersonalizationData {
  name: string;
  gender: GenderOption;
  format: ProductFormat;
  bibleVersion: BibleVersion;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  personalization: PersonalizationData;
  priceCents: number;
  status: 'pending' | 'processing' | 'completed' | 'shipped';
  createdAt: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
}

export interface CheckoutRequest {
  name: string;
  email: string;
  gender: GenderOption;
  format: ProductFormat;
  bibleVersion: BibleVersion;
}

export interface SampleRequest {
  name: string;
  email: string;
  gender: GenderOption;
  bibleVersion: BibleVersion;
}

export interface VerseSample {
  id: string;
  reference: string;
  text: string;
}
