import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Headset, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Zap
} from 'lucide-react';

const Help = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  // --- ADMIN LINKS (Apne links yahan daal dein) ---
  const SOCIAL_LINKS = {
    whatsapp: "https://wa.me/91XXXXXXXXXX", // Apna number daalein
    telegram: "https://t.me/YourUsername",  // Apna username daalein
  };

  const faqs = [
    {
      q: "Payment successful par balance nahi bada?",
      a: "Coinxpay automated gateway hai, zyadatar 1-2 mins lagte hain. Agar 10 mins se zyada ho gaye hain toh apna Order ID support par message karein."
    },
    {
      q: "Kya ye hacks/UC safe hain?",
      a: "Hum sirf VIP Anti-Ban services dete hain. Phir bhi, hum recommendation dete hain ki main account use karne se pehle guest ID par test karein."
    },
    {
      q: "Refund Policy kya hai?",
      a: "Digital products par delivery ke baad refund nahi milta, lekin agar product work nahi kar raha toh hum replacements dete hain."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-28 px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <ArrowLeft size={20} className="text-gray-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Support <span className="text-indigo-500">Center</span></h1>
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-0.5">We're here to help 24/7</p>
          </div>
        </div>

        {/* SUPPORT CHANNELS CARD */}
        <div className="gaming-card p-6 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
              <Headset size={20} className="text-indigo-400" />
            </div>
            <h2 className="text-lg font-black uppercase tracking-wide italic">Direct Contact</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* WhatsApp */}
            <a 
              href={SOCIAL_LINKS.whatsapp} 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-2xl hover:bg-green-500/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">WhatsApp Support</h4>
                  <p className="text-[10px] text-green-400/80 font-bold uppercase tracking-widest">Typical reply: 5 Mins</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-green-500 opacity-50 group-hover:opacity-100 transition" />
            </a>

            {/* Telegram */}
            <a 
              href={SOCIAL_LINKS.telegram} 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl hover:bg-blue-500/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <Send size={24} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">Telegram Group</h4>
                  <p className="text-[10px] text-blue-400/80 font-bold uppercase tracking-widest">Update & Announcements</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-blue-500 opacity-50 group-hover:opacity-100 transition" />
            </a>
          </div>
        </div>

        {/* TRUST BANNER */}
        <div className="flex justify-between gap-3 mb-8">
            <div className="flex-1 p-3 bg-white/5 border border-white/5 rounded-2xl text-center">
                <ShieldCheck size={18} className="text-indigo-500 mx-auto mb-2" />
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-tight">Secure Service</p>
            </div>
            <div className="flex-1 p-3 bg-white/5 border border-white/5 rounded-2xl text-center">
                <Clock size={18} className="text-indigo-500 mx-auto mb-2" />
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-tight">24/7 Support</p>
            </div>
            <div className="flex-1 p-3 bg-white/5 border border-white/5 rounded-2xl text-center">
                <Zap size={18} className="text-indigo-500 mx-auto mb-2" />
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-tight">Fast Reply</p>
            </div>
        </div>

        {/* FAQs */}
        <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 pl-1 italic">Common <span className="text-indigo-500 text-glow">FAQs</span></h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/5 rounded-2xl overflow-hidden bg-white/5 transition-all"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 flex justify-between items-center text-left"
              >
                <span className="text-xs font-bold tracking-tight pr-4">{faq.q}</span>
                {activeFAQ === index ? <ChevronUp size={16} className="text-indigo-500" /> : <ChevronDown size={16} className="text-gray-500" />}
              </button>
              
              {activeFAQ === index && (
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER INFO */}
        <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-12">
          Gaming Pro v1.0.4 • Mumbai, IN
        </p>
      </div>
    </div>
  );
};

export default Help;