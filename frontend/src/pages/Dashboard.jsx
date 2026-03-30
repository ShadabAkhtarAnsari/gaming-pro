import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, Plus, Zap, ShieldCheck, Crosshair, Bell, User, Flame, Smartphone, Tv } from 'lucide-react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ name: '', walletBalance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-indigo-500 font-bold tracking-widest uppercase mt-4 text-xs animate-pulse">Syncing Secure Network...</p>
      </div>
    );
  }

  const quickServices = [
    { name: "BGMI UC", icon: <Zap size={24} className="text-yellow-400" />, path: "/products", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
    { name: "VIP Hacks", icon: <Crosshair size={24} className="text-red-500" />, path: "/products", bg: "bg-red-500/10", border: "border-red-500/30" },
    { name: "Social Boost", icon: <Flame size={24} className="text-pink-500" />, path: "/products", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    { name: "Recharge", icon: <Smartphone size={24} className="text-green-500" />, path: "/products", bg: "bg-green-500/10", border: "border-green-500/30" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/50 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="text-indigo-400" size={24} />
              )}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Welcome Back</p>
              <h1 className="text-xl font-black tracking-tight">{userData.name || 'Gamer'}</h1>
            </div>
          </div>
          <button className="relative bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition">
            <Bell size={20} className="text-gray-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.3)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Wallet size={14} /> Available Balance
              </p>
              <h2 className="text-5xl font-black mt-1 tracking-tighter">
                ₹{userData.walletBalance.toLocaleString('en-IN')}
              </h2>
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            {/* UPDATE: Yahan Add Funds page ko connect kar diya gaya hai */}
            <Link 
              to="/add-funds" 
              className="flex-1 bg-white text-indigo-900 font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
            >
              <Plus size={20} /> Add Funds
            </Link>
            
            <Link 
              to="/history" 
              className="flex-1 bg-white/20 backdrop-blur-md text-white border border-white/20 font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              History
            </Link>
          </div>
        </div>

        <h3 className="text-lg font-black italic uppercase tracking-widest mb-4">Quick <span className="text-indigo-500">Access</span></h3>
        <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
          {quickServices.map((service, index) => (
            <Link key={index} to={service.path} className="flex flex-col items-center gap-2 group">
              <div className={`w-16 h-16 rounded-2xl ${service.bg} border ${service.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {service.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center group-hover:text-white transition-colors">
                {service.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-[#0f0f13] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <ShieldCheck size={20} className="text-green-500" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Servers Online</h4>
              <p className="text-xs text-gray-500 mt-0.5">Instant delivery active</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Live
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;