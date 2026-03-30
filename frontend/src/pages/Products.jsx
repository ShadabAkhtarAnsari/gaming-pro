import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, ShieldCheck, Crosshair, Crown, Flame, Target, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const services = [
  { id: 1, name: "BGMI VIP ESP + AIMBOT", price: 499, icon: <Crosshair className="text-red-500"/>, tag: "1 Day Key", desc: "Anti-Ban, Safe for Main ID" },
  { id: 2, name: "BGMI GLOBAL HACK (iOS)", price: 2499, icon: <Crown className="text-yellow-400"/>, tag: "7 Day Key", desc: "iPad View + No Recoil" },
  { id: 3, name: "PUBG GLOBAL VIP CHEAT", price: 1200, icon: <Target className="text-indigo-500"/>, tag: "Season Pass", desc: "Magic Bullet + High Jump" },
  { id: 4, name: "BGMI NO RECOIL CONFIG", price: 150, icon: <Zap className="text-green-500"/>, tag: "Permanent", desc: "100% Zero Recoil (OBB)" },
  { id: 5, name: "PUBG KR/VN BYPASS", price: 899, icon: <ShieldCheck className="text-blue-500"/>, tag: "30 Day Key", desc: "Latest Version Bypass" },
  { id: 6, name: "660 UC INSTANT PACK", price: 750, icon: <Flame className="text-orange-500"/>, tag: "Instant Cash", desc: "Official UC via Player ID" },
];

const Products = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWalletBalance(docSnap.data().walletBalance || 0);
        }
      }
    };
    fetchBalance();
  }, []);

  const handlePurchase = async (item) => {
    if (walletBalance < item.price) {
      showToast(`In-sufficient Funds! Need ₹${item.price - walletBalance} more.`, 'error');
      // Balance kam hai toh 2 sec baad recharge page par bhejo
      setTimeout(() => navigate('/add-funds'), 2000);
      return;
    }

    setLoading(true);
    // Yahan payment processing logic aayegi
    showToast(`Initializing purchase for ${item.name}...`, 'success');
    
    // Future: Update Firestore balance & send key to user
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-28 px-4 relative overflow-hidden">
      
      {/* TOAST ALERT */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
        </div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">VIP <span className="text-indigo-500">STORE</span></h2>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Hacks • Cheats • UC Packs</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Wallet size={16} className="text-indigo-400" />
            <span className="text-sm font-black italic">₹{walletBalance}</span>
          </div>
        </div>

        {/* PRODUCTS LIST */}
        <div className="space-y-4">
          {services.map((item) => (
            <div key={item.id} className="gaming-card p-5 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative group overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="bg-[#0a0a0c] w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md">{item.tag}</span>
                  <h3 className="text-lg font-bold text-white mt-1 leading-tight">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium">{item.desc}</p>
                </div>
              </div>
              
              <div className="mt-5 flex justify-between items-center border-t border-white/5 pt-4">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Price</span>
                  <span className="text-xl font-black text-white italic">₹{item.price}</span>
                </div>
                <button 
                  onClick={() => handlePurchase(item)}
                  disabled={loading}
                  className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition-all active:scale-90 shadow-lg shadow-indigo-600/20"
                >
                  Buy Now
                </button>
              </div>

              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition"></div>
            </div>
          ))}
        </div>

        {/* SUPPORT BANNER */}
        <div className="mt-10 p-6 bg-indigo-600/10 border border-dashed border-indigo-500/30 rounded-3xl text-center">
            <p className="text-xs font-bold text-gray-400 uppercase">Need a custom key?</p>
            <Link to="/help" className="text-indigo-400 font-black uppercase text-sm mt-1 block hover:text-white transition">Contact Admin Support</Link>
        </div>

      </div>
    </div>
  );
};

export default Products;