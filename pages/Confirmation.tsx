
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PersonalizationData, BibleVersion, ProductFormat } from '../types';
import { BIBLE_VERSIONS, FORMAT_LABELS } from '../constants';

interface OrderData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  gender: string;
  format: ProductFormat;
  bibleVersion: BibleVersion;
  amountTotal: number;
}

const Confirmation: React.FC = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get session_id from URL query params
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');

  // Fallback to old location state method for backwards compatibility
  const legacyOrderDetails = location.state?.orderDetails as PersonalizationData;

  useEffect(() => {
    if (sessionId) {
      // Fetch order details from Stripe session
      fetchOrderDetails(sessionId);
    } else if (legacyOrderDetails) {
      // Use legacy order details (mock flow)
      setOrderData({
        orderId: 'WN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        customerEmail: 'customer@example.com',
        customerName: legacyOrderDetails.name,
        gender: legacyOrderDetails.gender,
        format: legacyOrderDetails.format,
        bibleVersion: legacyOrderDetails.bibleVersion || 'web',
        amountTotal: 0,
      });
      setLoading(false);
    } else {
      setError('No order information found');
      setLoading(false);
    }
  }, [sessionId]);

  async function fetchOrderDetails(sessionId: string) {
    try {
      const response = await fetch(`/api/get-session?session_id=${sessionId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const data = await response.json();
      setOrderData(data);
    } catch (err) {
      setError('Unable to load order details. Please check your email for confirmation.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-navy/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <svg className="animate-spin h-10 w-10 text-navy" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-navy/60 text-lg">Loading your order details...</p>
      </div>
    );
  }

  if (error && !orderData) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h1 className="font-serif text-3xl text-navy">Order Not Found</h1>
        <p className="text-navy/60">{error}</p>
        <Link to="/" className="inline-block bg-navy text-white px-8 py-4 rounded-full font-bold hover:bg-navy/90 transition-all">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-12">
      <div className="w-24 h-24 bg-navy rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-gold">
        <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="font-serif text-5xl text-navy">Order Confirmed</h1>
        <p className="text-xl text-navy/60">Thank you, {orderData?.customerName || 'Friend'}. Your personalized journey is beginning.</p>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-xl border border-navy/5 text-left space-y-8">
         <div className="flex justify-between items-center border-b border-navy/5 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Order Number</p>
              <p className="text-lg font-mono text-navy">{orderData?.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Date</p>
              <p className="text-lg text-navy">{new Date().toLocaleDateString()}</p>
            </div>
         </div>

         {orderData && (
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-b border-navy/5">
             <div>
               <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Format</p>
               <p className="text-navy font-medium">{FORMAT_LABELS[orderData.format]}</p>
             </div>
             <div>
               <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Translation</p>
               <p className="text-navy font-medium">{BIBLE_VERSIONS[orderData.bibleVersion]?.name || orderData.bibleVersion}</p>
             </div>
             <div>
               <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Personalized For</p>
               <p className="text-navy font-medium">{orderData.customerName}</p>
             </div>
             {orderData.amountTotal > 0 && (
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Total</p>
                 <p className="text-navy font-medium">${(orderData.amountTotal / 100).toFixed(2)}</p>
               </div>
             )}
           </div>
         )}

         <div className="space-y-4">
            <h3 className="font-serif text-2xl text-navy">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold text-xs font-bold">1</div>
                <p className="text-navy/70">Our system is weaving <span className="font-semibold text-navy">"{orderData?.customerName}"</span> into the Gospels of Matthew, Mark, Luke, and John.</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold text-xs font-bold">2</div>
                <p className="text-navy/70">
                  {orderData?.format === 'digital'
                    ? `Your high-resolution PDF will be sent to ${orderData.customerEmail} within the next 10 minutes.`
                    : "Your book will be printed and bound. You'll receive a shipping notification with tracking in 2-4 business days."}
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold text-xs font-bold">3</div>
                <p className="text-navy/70">A receipt has been sent to {orderData?.customerEmail || 'your email'} for your records.</p>
              </div>
            </div>
         </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
        <Link to="/" className="text-navy font-semibold hover:underline">Return Home</Link>
        <span className="hidden sm:inline text-navy/20">|</span>
        <button className="text-navy font-semibold hover:underline" onClick={() => window.print()}>Print Receipt</button>
      </div>
    </div>
  );
};

export default Confirmation;
