
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenderOption, ProductFormat, PersonalizationData } from '../types';
import { PRICING, FORMAT_LABELS, SAMPLE_VERSES } from '../constants';
import { personalizeText } from '../utils/personalization';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PersonalizationData>({
    name: '',
    gender: 'female',
    format: 'softcover'
  });
  
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cycle through verses
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVerseIndex((prev) => (prev + 1) % SAMPLE_VERSES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a name for personalization.");
      return;
    }
    setIsProcessing(true);
    // Simulate API call to create checkout session
    setTimeout(() => {
      navigate('/confirmation', { state: { orderDetails: formData } });
    }, 2000);
  };

  const activeVerse = SAMPLE_VERSES[activeVerseIndex];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Form Side */}
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="font-serif text-4xl text-navy">Create Your Personal Gospel</h1>
          <p className="text-navy/60">Fill in the details below to begin weaving your name into the Word.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Name */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-wider text-navy/70">
              1. Recipient's First Name
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g. Elizabeth" 
              value={formData.name}
              onChange={handleInputChange}
              className="w-full text-2xl font-serif bg-transparent border-b-2 border-navy/20 focus:border-gold outline-none py-3 transition-all placeholder:text-navy/10"
              required
            />
            {formData.name.trim() && (
               <p className="text-xs text-gold font-medium flex items-center animate-pulse">
                 <span className="mr-2">✨</span> Personalizing text now...
               </p>
            )}
          </div>

          {/* Step 2: Gender */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-wider text-navy/70">
              2. Preferred Form of Address
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['male', 'female', 'neutral'] as GenderOption[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleSelectChange('gender', g)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all font-medium text-sm capitalize ${
                    formData.gender === g 
                      ? 'border-gold bg-gold/5 text-navy' 
                      : 'border-navy/5 hover:border-navy/20 text-navy/50'
                  }`}
                >
                  {g === 'neutral' ? 'Beloved' : g}
                </button>
              ))}
            </div>
            <p className="text-xs text-navy/40 italic">This ensures terms like "son" or "daughter" reflect the reader's heart.</p>
          </div>

          {/* Step 3: Format */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-wider text-navy/70">
              3. Choose Your Format
            </label>
            <div className="space-y-3">
              {(['digital', 'softcover', 'hardcover', 'leather'] as ProductFormat[]).map((f) => (
                <div 
                  key={f}
                  onClick={() => handleSelectChange('format', f)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    formData.format === f 
                      ? 'border-gold bg-gold/5' 
                      : 'border-navy/5 hover:border-navy/20'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${formData.format === f ? 'bg-gold border-gold' : 'border-navy/20'}`}></div>
                    <div>
                      <p className="font-semibold text-navy">{FORMAT_LABELS[f]}</p>
                      <p className="text-xs text-navy/50">
                        {f === 'digital' ? 'Immediate high-res PDF' : 'Printed on premium cream paper'}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-navy">${(PRICING[f] / 100).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-navy text-white py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isProcessing ? (
               <span className="flex items-center">
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Processing...
               </span>
            ) : (
              <span>Continue to Checkout — ${(PRICING[formData.format] / 100).toFixed(2)}</span>
            )}
          </button>
        </form>
      </div>

      {/* Preview Side */}
      <div className="lg:sticky lg:top-32 h-fit space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-navy/5 aspect-[4/5] flex flex-col">
          <div className="bg-navy p-6 flex justify-between items-center">
             <span className="text-gold/60 text-xs font-bold uppercase tracking-[0.2em]">Interior Preview</span>
             <span className="text-cream/40 text-xs">{activeVerse.reference}</span>
          </div>
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-12">
             <div className="w-16 h-px bg-navy/10"></div>
             <div className="relative">
                <div className="absolute -top-10 -left-6 text-6xl text-navy/5 font-serif font-bold">“</div>
                <p className="text-2xl md:text-3xl font-scripture text-navy/90 leading-relaxed italic animate-in fade-in duration-1000">
                  {personalizeText(activeVerse.text, formData.name, formData.gender)}
                </p>
             </div>
             <div className="w-16 h-px bg-navy/10"></div>
          </div>
          <div className="p-8 border-t border-navy/5 text-center">
             <p className="text-navy/30 text-xs italic italic">
               The text automatically adjusts to your specific name and gender choices.
             </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 text-center">
             <p className="text-[10px] uppercase font-bold text-gold mb-1">Paper Quality</p>
             <p className="text-sm font-medium text-navy">80lb Cream Uncoated</p>
          </div>
          <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 text-center">
             <p className="text-[10px] uppercase font-bold text-gold mb-1">Translation</p>
             <p className="text-sm font-medium text-navy">World English Bible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
