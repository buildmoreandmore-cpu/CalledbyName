
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { personalizeText } from '../utils/personalization';

const Home: React.FC = () => {
  const [demoName, setDemoName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sampleVerse = "I have loved you, {{NAME}}. Remain in my love. {{SON_DAUGHTER}}, you are mine.";

  useEffect(() => {
    if (demoName) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [demoName]);

  const faqs = [
    { q: "Is this a new translation?", a: "No. We use the World English Bible (WEB), a respected public domain translation. We only add personalization placeholders, preserving the original sacred text." },
    { q: "How are the books made?", a: "Each book is individually typeset. We use high-quality 80lb cream paper and premium bindings to ensure your Bible is a keepsake for years to come." },
    { q: "Can I buy this as a gift?", a: "Absolutely. Personalizing a copy for a loved one is our most popular use case. Simply enter their name and choose the gender-appropriate terms during creation." }
  ];

  return (
    <div className="space-y-24 pb-24 selection:bg-gold/30">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-cream via-cream to-gold/5">
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest">A New Way to Read</span>
              <h1 className="font-serif text-6xl md:text-8xl text-navy leading-[1.1]">
                Scripture That <br/>
                <span className="text-gold italic relative inline-block">
                  Speaks Your Name
                  <svg className="absolute -bottom-2 left-0 w-full text-gold/30" viewBox="0 0 300 20" fill="none">
                    <path d="M5 15Q150 5 295 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-navy/70 max-w-xl leading-relaxed font-light">
              Experience the Gospels as an intimate conversation. A personalized edition where Jesus addresses you directly, weaving your name into every sacred promise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/create" 
                className="bg-gold text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl shadow-gold/20 hover:shadow-gold/40 hover:scale-105 transition-all text-center group"
              >
                Create Your Book
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                to="/sample" 
                className="bg-navy text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-navy/90 transition-all text-center shadow-lg"
              >
                Get Free Sample
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-navy/50">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-cream bg-navy/10 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Trusted by <span className="text-navy font-bold">1,200+</span> readers this month</p>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-300">
             <div className="relative group">
               <div className="absolute -inset-4 bg-navy/10 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
               
               <div className="relative w-80 h-[500px] bg-[#141d32] rounded-r-xl shadow-[25px_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden border-l-[12px] border-gold/40 perspective-1000 transform hover:rotate-y-[-5deg] transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10"></div>
                  
                  <div className="p-10 h-full flex flex-col justify-between items-center text-center">
                    <div className="w-16 h-px bg-gold/30"></div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-[#fdf2d0] font-serif text-4xl tracking-tight leading-none drop-shadow-md">THE<br/>GOSPELS</h2>
                        <div className="w-12 h-0.5 bg-gold mx-auto mt-4"></div>
                      </div>
                      <p className="text-gold/60 uppercase tracking-[0.3em] text-[10px] font-bold">Personalized Edition</p>
                    </div>

                    <div className="space-y-4 py-8 border-y border-white/5 w-full">
                      <p className="text-white/40 text-[10px] uppercase tracking-widest italic">Hand-crafted for</p>
                      <p className="text-[#fdf2d0] font-serif text-3xl italic drop-shadow-sm">Sarah Jenkins</p>
                    </div>

                    <div className="space-y-4">
                      <div className="italic text-[#fdf2d0]/50 font-scripture text-sm max-w-[180px] leading-relaxed">
                        "Sarah, I have called you by name; you are mine."
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center">
                        <span className="text-gold text-[10px]">†</span>
                      </div>
                    </div>
                  </div>
               </div>
               
               <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-navy/5 animate-bounce-slow">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-navy/70">Sarah just ordered</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Live Preview Interaction - THE AHA MOMENT */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-16 py-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-navy">See the transformation</h2>
          <p className="text-lg text-navy/60">Type your name below to see how the Living Word adapts to you personally. This is how your book will read.</p>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white p-10 md:p-20 rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-navy/5 space-y-12">
            <div className="max-w-md mx-auto relative">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your name..." 
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
                className={`w-full text-center text-3xl md:text-4xl font-serif bg-transparent border-b-2 outline-none py-3 transition-all placeholder:text-navy/10 ${isTyping ? 'border-gold shadow-[0_10px_20px_-10px_rgba(201,162,39,0.3)]' : 'border-navy/10'}`}
              />
              {demoName && (
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-gold animate-pulse text-2xl">
                  ✨
                </div>
              )}
            </div>
            
            <div className="min-h-[160px] flex flex-col items-center justify-center space-y-6">
              <div className="w-12 h-px bg-gold/20"></div>
              <p className={`text-2xl md:text-4xl font-scripture text-navy/90 leading-relaxed italic transition-all duration-500 ${isTyping ? 'blur-[1px] opacity-70 scale-[0.99]' : 'blur-0 opacity-100 scale-100'}`}>
                {personalizeText(sampleVerse, demoName, 'neutral')}
              </p>
              <div className="w-12 h-px bg-gold/20"></div>
              <p className="text-xs uppercase tracking-widest text-gold font-bold opacity-60">Sample from John 15</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "I've never felt closer to the heart of Jesus. Seeing my name on the page changed how I pray.", author: "Michael R.", location: "Atlanta, GA" },
            { text: "The quality of the leather edition is breathtaking. Truly a gift to be passed down.", author: "Sarah W.", location: "London, UK" },
            { text: "It's one thing to hear 'God loves you'. It's another to read 'Jesus loves you, Elena'.", author: "Elena M.", location: "Madrid, ES" }
          ].map((t, i) => (
            <div key={i} className="bg-white/50 p-8 rounded-2xl border border-navy/5 hover:bg-white hover:shadow-xl transition-all duration-500 group">
               <div className="flex text-gold mb-4 group-hover:scale-110 transition-transform origin-left">
                 {[1,2,3,4,5].map(s => <span key={s} className="mr-0.5">★</span>)}
               </div>
               <p className="text-navy/80 mb-6 italic leading-relaxed">"{t.text}"</p>
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-[10px] font-bold text-navy">
                   {t.author[0]}
                 </div>
                 <div className="text-xs">
                   <p className="font-bold text-navy">{t.author}</p>
                   <p className="text-navy/40">{t.location}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
        <div className="text-center">
           <Link to="/create" className="inline-block bg-gold text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
             Experience it Now
           </Link>
        </div>
      </section>

      {/* How it Works - IMPROVED CONTRAST */}
      <section className="bg-navy py-32 px-6 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="font-serif text-5xl text-gold">Crafted with Reverence</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-xl leading-relaxed font-light">Every book is individually typeset and checked by hand to ensure the personalization feels seamless and sacred.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-8 group">
              <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto text-gold text-3xl font-serif border border-gold/40 group-hover:rotate-12 transition-transform shadow-lg shadow-gold/10">1</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold">Deep Personalization</h3>
                <p className="text-white/70 leading-relaxed font-light text-lg">We don't just find-and-replace. We weave your name into the flow of the Gospel narrative at key emotional peaks.</p>
              </div>
            </div>
            <div className="space-y-8 group">
              <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto text-gold text-3xl font-serif border border-gold/40 group-hover:rotate-12 transition-transform shadow-lg shadow-gold/10">2</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold">Premium Materials</h3>
                <p className="text-white/70 leading-relaxed font-light text-lg">From 80lb archival cream paper to ethically sourced Italian leather, your book is built for a lifetime of devotion.</p>
              </div>
            </div>
            <div className="space-y-8 group">
              <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto text-gold text-3xl font-serif border border-gold/40 group-hover:rotate-12 transition-transform shadow-lg shadow-gold/10">3</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold">A Sacred Gift</h3>
                <p className="text-white/70 leading-relaxed font-light text-lg">Packaged in a signature linen box, it arrives ready to be cherished by you or a loved one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-4xl text-navy">Questions & Answers</h2>
          <p className="text-navy/50">Everything you need to know about your personalized edition.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-navy/5 overflow-hidden transition-all shadow-sm hover:shadow-md">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-navy">
                {f.q}
                <span className="text-gold transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-6 text-navy/70 leading-relaxed border-t border-navy/5 pt-4">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final Pricing Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-2xl border border-navy/5 flex flex-col items-center text-center space-y-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="space-y-6 relative z-10">
            <h2 className="font-serif text-5xl text-navy">Begin your intimate journey</h2>
            <p className="text-xl text-navy/60 max-w-xl mx-auto">Select the format that fits your heart and start seeing Scripture in a whole new light.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full relative z-10">
            {[
              { name: 'Digital', price: '24.99', desc: 'Instant Download' },
              { name: 'Softcover', price: '39.99', desc: 'Trade Paperback', popular: true },
              { name: 'Hardcover', price: '59.99', desc: 'Linen Bound' },
              { name: 'Leather', price: '89.99', desc: 'Premium Heirloom', giftable: true }
            ].map((tier) => (
              <div key={tier.name} className={`group relative p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between hover:scale-105 ${tier.popular ? 'border-gold bg-white shadow-2xl shadow-gold/20 ring-4 ring-gold/5' : 'border-navy/5 bg-cream/30 hover:bg-white hover:shadow-xl'}`}>
                {tier.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Most Popular</span>}
                {tier.giftable && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Ideal Gift</span>}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl group-hover:text-gold transition-colors">{tier.name}</h3>
                  <div className="text-4xl font-bold text-navy">${tier.price}</div>
                  <p className="text-sm text-navy/40 font-medium">{tier.desc}</p>
                </div>
                <Link to="/create" className={`mt-10 block w-full text-center py-4 rounded-full font-bold transition-all shadow-md ${tier.popular ? 'bg-gold text-white hover:bg-gold/90' : 'bg-navy text-white hover:bg-navy/90'}`}>
                  Select
                </Link>
                {tier.giftable && (
                   <p className="mt-4 text-[10px] text-navy/40 uppercase font-bold">Includes signature gift box</p>
                )}
              </div>
            ))}
          </div>
          
          <div className="relative z-10 flex flex-col items-center space-y-4">
             <p className="text-sm text-navy/30">Free worldwide shipping on physical orders over $100.</p>
             <div className="flex space-x-4 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" alt="paypal"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="visa"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="mastercard"/>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
