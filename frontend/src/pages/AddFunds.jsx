import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Bitcoin, Zap, ShieldCheck, Activity, Lock } from 'lucide-react';
// Firebase logic
import { auth, db } from '../firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 

const AddFunds = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Custom Alert State
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => { setToast({ show: false, message: '', type: '' }); }, 4000);
  };

  const exchangeRate = 88; 
  const cryptoAmount = amount ? (amount / exchangeRate).toFixed(2) : 0;

  // --- NEW PAYMENT GATEWAY LOGIC ---
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    // Minimum 50 INR check
    if (!amount || amount < 50) {
      showToast('Minimum deposit is ₹50', 'error');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      showToast('Please login first!', 'error');
      return;
    }

    setLoading(true);

    try {
      showToast('Connecting to Secure Gateway...', 'success');
      
      const orderId = `ORD${Date.now()}`;

      // Naye Vercel Backend ko call kar rahe hain
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amountINR: Number(amount),
          orderId: orderId
        })
      });

      const data = await response.json();

      // Naye Gateway ke Success Response structure ke hisaab se:
      if (data.status === true && data.result && data.result.payment_url) {
        
        // Save to Firebase (Order ko database mein likh do)
        await setDoc(doc(db, "deposits", orderId), {
          uid: user.uid,
          orderId: orderId,
          amountINR: Number(amount),
          amountUSDT: parseFloat(cryptoAmount), // Record keeping ke liye USDT bhi save kar diya
          status: "pending",
          createdAt: new Date()
        });

        // Seedha Payment Page par bhej do
        window.location.href = data.result.payment_url;

      } else {
        // Agar status "false" aaya ya API ne koi error message diya
        showToast(data.message || 'Payment Gateway rejected the request.', 'error');
        setLoading(false);
      }

    } catch (error) {
      console.error("Payment routing error:", error);
      showToast('Something went wrong connecting to the server.', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-28 px-4 relative overflow-hidden">
      
      {/* CUSTOM TOAST ALERT UI */}
      <div 
        className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${
          toast.show ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
        }`}
      >
        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${
          toast.type === 'success' 
            ? 'bg-green-500/10 border-green-500/50 text-green-400' 
            : 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
        </div>
      </div>
      {/* ----------------------------- */}

      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-md mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10 pt-2">
          <Link to="/dashboard" className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <ArrowLeft size={20} className="text-gray-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Initialize <span className="text-indigo-500 neon-text">Purchase</span></h1>
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-0.5">Automated Crypto Gateway (Fee 1%)</p>
          </div>
        </div>

        {/* PAYMENT BOX (PREMIUM UI) */}
        <form onSubmit={handlePaymentSubmit} className="space-y-6" noValidate>
          
          <div className="gaming-card p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden shadow-[0_0_60px_rgba(99,102,241,0.1)]">
            {/* Background Icon Watermark */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Zap size={150} />
            </div>

            <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4 block relative z-10">Amount to Deposit (INR)</label>
            <div className="relative mb-6 z-10">
              <span className="absolute left-0 text-4xl font-black text-gray-700">₹</span>
              <input 
                type="number" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                // Custom focus border and neon glow on active
                className="w-full bg-transparent border-b-2 border-white/10 py-4 pl-10 pr-4 text-5xl font-black text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10"
              />
            </div>

            <div className="flex justify-between items-center p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl relative z-10">
              <div className="flex items-center gap-2">
                <Bitcoin size={16} className="text-indigo-500" />
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">You Pay ~</span>
              </div>
              <span className="text-2xl font-black text-white italic">{cryptoAmount} <span className="text-xs text-indigo-400 not-italic uppercase">USDT</span></span>
            </div>
            
            <p className="text-[9px] text-center text-gray-500 mt-5 font-bold uppercase tracking-widest flex items-center justify-center gap-2 relative z-10">
              <ShieldCheck size={12} className="text-green-500"/> Instant delivery via Auto Network
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading || amount < 50}
            // Advanced hover and active effects
            className="w-full bg-indigo-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-indigo-500 active:scale-[0.98] transition-all duration-300 shadow-[0_20px_50px_rgba(79,70,229,0.3)] disabled:opacity-30 disabled:grayscale disabled:pointer-events-none flex justify-center items-center gap-2"
          >
            {loading ? 'Connecting Gateway...' : <><Activity size={18} /> Proceed to Checkout</>}
          </button>
          
          <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">Minimum deposit: ₹50 • Secure Checkout</p>
        </form>

        {/* SUPPORTED NETWORKS BANNER */}
        <div className="mt-12 gaming-card p-5 rounded-xl border border-white/5 text-center flex flex-col items-center">
          <Lock size={24} className="text-gray-500 mb-2" />
          <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block">100% Secure Payment Gateway</label>
        </div>

      </div>
    </div>
  );
};

export default AddFunds;