
import React from 'react';
import { VerseSample } from './types';

export const COLORS = {
  navy: '#1a2744',
  gold: '#c9a227',
  cream: '#f5f0e6',
  charcoal: '#2d2d2d',
};

export const PRICING = {
  digital: 2499,
  softcover: 3999,
  hardcover: 5999,
  leather: 8999,
};

export const FORMAT_LABELS = {
  digital: 'Digital Download (PDF)',
  softcover: 'Softcover Edition',
  hardcover: 'Hardcover Edition',
  leather: 'Premium Leather Bound',
};

export const SAMPLE_VERSES: VerseSample[] = [
  {
    id: 'matthew-5-14',
    reference: 'Matthew 5:14-16',
    text: '"{{NAME}}, you are the light of the world. A city set on a hill cannot be hidden... Let your light shine before men, {{SON_DAUGHTER}}, that they may see your good works and glorify your Father who is in heaven."'
  },
  {
    id: 'john-15-9',
    reference: 'John 15:9',
    text: '"Even as the Father has loved me, I also have loved you. Remain in my love, {{NAME}}. My child, if you keep my commandments, you will remain in my love, even as I have kept my Father’s commandments and remain in his love."'
  },
  {
    id: 'matthew-11-28',
    reference: 'Matthew 11:28',
    text: '"Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, {{NAME}}, for I am gentle and humble in heart; and you will find rest for your soul. {{SON_DAUGHTER}}, my yoke is easy, and my burden is light."'
  }
];
