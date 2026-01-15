
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PersonalizationData } from '../types';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails as PersonalizationData;

  const orderId = "WN-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-12">
      <div className="w-24 h-24 bg-navy rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-gold">
         <span className="text-gold font-serif text-4xl">C</span>
      </div>
      
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="font-serif text-5xl text-navy">Order Confirmed</h1>
        <p className="text-xl text-navy/60">Thank you, {orderDetails?.name || 'Friend'}. Your personalized journey is beginning.</p>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-xl border border-navy/5 text-left space-y-8">
         <div className="flex justify-between items-center border-b border-navy/5 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Order Number</p>
              <p className="text-lg font-mono text-navy">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-navy/40">Date</p>
              <p className="text-lg text-navy">{new Date().toLocaleDateString()}</p>
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="font-serif text-2xl text-navy">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold text-xs font-bold">1</div>
                <p className="text-navy/70">Our system is weaving <span className="font-semibold text-navy">"{orderDetails?.name}"</span> into the Gospels of Matthew, Mark, Luke, and John.</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold text-xs font-bold">2</div>
                <p className="text-navy/70">
                  {orderDetails?.format === 'digital' 
                    ? "Your high-resolution PDF will be sent to your email address within the next 10 minutes." 
                    : "Your book will be printed and bound. You'll receive a shipping notification with tracking in 2-4 business days."}
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gold/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold text-xs font-bold">3</div>
                <p className="text-navy/70">A receipt has been sent to your email for your records.</p>
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
