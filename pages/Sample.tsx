
import React, { useState } from 'react';
import { personalizeText } from '../utils/personalization';

const Sample: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sampleVerse = "You are the light of the world, {{NAME}}. Let your light shine, {{SON_DAUGHTER}}.";

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
           <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
           </svg>
        </div>
        <h1 className="font-serif text-4xl text-navy">Your Sample is Ready</h1>
        <p className="text-navy/70 leading-relaxed text-lg">
          We've sent a personalized PDF of Matthew Chapter 5 (The Sermon on the Mount) to <strong className="text-navy">{email}</strong>.
        </p>
        <div className="p-12 bg-white rounded-3xl shadow-lg border border-gold/20 italic font-scripture text-2xl text-navy/80">
          {personalizeText(sampleVerse, name, 'neutral')}
        </div>
        <p className="text-sm text-navy/40">Check your inbox. It might take a minute or two to arrive.</p>
        <div className="pt-8">
          <a href="/#/create" className="bg-navy text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-navy/90 transition-all inline-block">
             Personalize the Full Gospels
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <span className="bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Free Lead Magnet</span>
        <h1 className="font-serif text-5xl text-navy leading-tight">Taste the <span className="text-gold italic">Intimacy</span> of Personalized Scripture</h1>
        <p className="text-lg text-navy/70 leading-relaxed">
          Experience how it feels to read Jesus' words directed at you. Get a free personalized PDF of the Sermon on the Mount (Matthew 5) instantly.
        </p>
        <ul className="space-y-4">
          {['Full personalization of Matthew 5', 'Print-ready high-quality PDF', 'Experience the Intimate Address system'].map((item) => (
            <li key={item} className="flex items-center space-x-3 text-navy/80">
               <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
               </svg>
               <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-12 rounded-3xl shadow-2xl border border-navy/5">
        <form onSubmit={handleSubmit} className="space-y-8">
           <div className="space-y-4">
              <label className="block text-sm font-semibold uppercase tracking-wider text-navy/60">First Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What is your name?"
                className="w-full text-xl font-serif bg-transparent border-b-2 border-navy/10 focus:border-gold outline-none py-2 transition-all"
              />
           </div>
           <div className="space-y-4">
              <label className="block text-sm font-semibold uppercase tracking-wider text-navy/60">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Where should we send it?"
                className="w-full text-xl font-serif bg-transparent border-b-2 border-navy/10 focus:border-gold outline-none py-2 transition-all"
              />
           </div>
           <button 
             type="submit" 
             className="w-full bg-gold text-white py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
           >
             Get My Free Sample
           </button>
           <p className="text-center text-xs text-navy/30">
             By submitting, you agree to receive spiritual encouragement and occasional offers. No spam, ever.
           </p>
        </form>
      </div>
    </div>
  );
};

export default Sample;
