
export type GenderOption = 'male' | 'female' | 'neutral';

export type ProductFormat = 'digital' | 'softcover' | 'hardcover' | 'leather';

export interface PersonalizationData {
  name: string;
  gender: GenderOption;
  format: ProductFormat;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  personalization: PersonalizationData;
  priceCents: number;
  status: 'pending' | 'processing' | 'completed' | 'shipped';
  createdAt: string;
}

export interface VerseSample {
  id: string;
  reference: string;
  text: string;
}
