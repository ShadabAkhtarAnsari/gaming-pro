import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Bitcoin, Crosshair, Flame, Activity, Trophy, Users, CheckCircle2, Lock } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      
      {/* 1. LIVE PURCHASE TICKER (Builds Trust & FOMO) */}
      <div className="bg-indigo-600/20 border-b border-indigo-500/30 py-2 overflow-hidden relative flex items-center">
        <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="animate-scroll flex gap-8 items-center text-xs font-bold uppercase tracking-widest text-indigo-300">
          <span className="flex items-center gap-2"><Activity size={14} className="text-green-400" /> Rahul purchased 660 UC</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Activity size={14} className="text-green-400" /> Anon192 paid via USDT for VIP Hack</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Activity size={14} className="text-green-400" /> Priya boosted 10K Insta Followers</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Activity size={14} className="text-green-400" /> GamerX bought Netflix Premium</span>
        </div>
        <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
        {/* Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        {/* Floating Trust Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.15)]">
          <Lock size={14} className="text-indigo-400" />
          <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">100% Secure Crypto Network</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
          Elevate Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600 neon-text drop-shadow-2xl">
            Digital Arsenal
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-12 font-medium border-l-2 border-indigo-500 pl-6 text-left mx-auto">
          India's most elite platform for BGMI UC, Anti-Ban Hacks, Social Media Growth, and Premium Subscriptions. Anonymous tracking, crypto payments, zero downtime.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link to="/products" className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:scale-105 transition-all shadow-[0_0_40px_rgba(99,102,241,0.4)] flex items-center justify-center gap-3 group">
            <Flame className="group-hover:animate-bounce" size={24} /> Access Store
          </Link>
          <Link to="/login" className="bg-transparent border-2 border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/5 hover:border-indigo-500/50 transition-all flex items-center justify-center">
            Register / Login
          </Link>
        </div>

        {/* User Stats Under Hero */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-black text-white mb-1">24k+</h4>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Active Users</span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-black text-white mb-1">1.2M+</h4>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">UC Delivered</span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block"></div>
          <div className="flex flex-col items-center">
            <h4 className="text-4xl font-black text-white mb-1">100%</h4>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Anti-Ban Record</span>
          </div>
        </div>
      </div>

      {/* 3. PREMIUM BENTO GRID (Services Preview) */}
      <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tight mb-10 text-center">
          EXPLORE <span className="text-indigo-500">CATEGORIES</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {/* Main Large Card */}
          <div className="md:col-span-2 md:row-span-2 gaming-card p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
            <Crosshair size={120} className="absolute -right-10 -top-10 text-white/5 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-20">
              <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Best Seller</span>
              <h3 className="text-4xl font-black mb-2">BGMI VIP HACKS</h3>
              <p className="text-gray-400 font-medium mb-6">Undetected ESP, Bullet Track, & Magic Bullet. Root/Non-Root supported.</p>
              <Link to="/products" className="text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition">View Plans <ChevronRight size={16}/></Link>
            </div>
          </div>

          {/* Medium Card 1 */}
          <div className="md:col-span-2 gaming-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-yellow-500/10 w-32 h-32 blur-2xl rounded-full"></div>
            <h3 className="text-2xl font-black mb-2 relative z-10">UC & Game Currency</h3>
            <p className="text-gray-400 text-sm mb-4 max-w-[70%] relative z-10">Instant delivery via Character ID. No login required.</p>
            <Zap size={40} className="text-yellow-400 absolute bottom-6 right-6" />
          </div>

          {/* Small Card 1 */}
          <div className="gaming-card p-6 rounded-3xl flex flex-col justify-between group cursor-pointer hover:bg-indigo-600/10">
            <Users size={32} className="text-pink-500" />
            <div>
              <h3 className="text-lg font-black mt-4">Social Media</h3>
              <p className="text-gray-500 text-xs mt-1">Boost Followers & Likes</p>
            </div>
          </div>

          {/* Small Card 2 */}
          <div className="gaming-card p-6 rounded-3xl flex flex-col justify-between group cursor-pointer hover:bg-indigo-600/10">
            <Activity size={32} className="text-green-500" />
            <div>
              <h3 className="text-lg font-black mt-4">Utility Bills</h3>
              <p className="text-gray-500 text-xs mt-1">Recharge & Electricity</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. LIVE CRYPTO TRANSACTIONS (Builds authenticity) */}
      <div className="bg-[#0a0a0c] border-y border-white/5 py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black italic tracking-tight flex items-center gap-3">
                <Bitcoin className="text-yellow-500" size={36} /> RECENT PAYOUTS
              </h2>
              <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">Verified Crypto Transactions on Network</p>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 uppercase tracking-widest text-[10px]">
                  <th className="pb-4 font-bold">User (Masked)</th>
                  <th className="pb-4 font-bold">Service Purchased</th>
                  <th className="pb-4 font-bold">Amount</th>
                  <th className="pb-4 font-bold">Crypto Method</th>
                  <th className="pb-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-gray-300">
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> U***89</td>
                  <td className="py-5 text-white">BGMI 1500 UC Pack</td>
                  <td className="py-5 font-mono text-green-400">₹1,850</td>
                  <td className="py-5 flex items-center gap-2"><Bitcoin size={16} className="text-yellow-500"/> USDT (TRC20)</td>
                  <td className="py-5 text-right"><span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-xs font-bold uppercase">Completed</span></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500"></div> K***21</td>
                  <td className="py-5 text-white">10K Instagram Followers</td>
                  <td className="py-5 font-mono text-green-400">₹1,200</td>
                  <td className="py-5 flex items-center gap-2"><Bitcoin size={16} className="text-blue-500"/> TRX</td>
                  <td className="py-5 text-right"><span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-xs font-bold uppercase">Completed</span></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> M***0X</td>
                  <td className="py-5 text-white">VIP Root Hack (1 Month)</td>
                  <td className="py-5 font-mono text-green-400">₹2,500</td>
                  <td className="py-5 flex items-center gap-2"><Bitcoin size={16} className="text-yellow-500"/> BNB (BEP20)</td>
                  <td className="py-5 text-right"><span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-md text-xs font-bold uppercase">Processing</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. CALL TO ACTION FOOTER */}
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <Trophy size={60} className="text-indigo-500 mx-auto mb-8" />
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
          Ready to Dominate?
        </h2>
        <p className="text-gray-400 font-medium mb-10 max-w-xl mx-auto">
          Create your account now. Add funds using Crypto, and get instant access to our premium suite of tools and services.
        </p>
        <Link to="/login" className="inline-block bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          Join Gaming Pro Now
        </Link>
      </div>

    </div>
  );
};

export default Home;