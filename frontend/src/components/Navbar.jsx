import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShoppingCart, User, History,LayoutGrid } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-indigo-500/30 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-black text-white flex items-center gap-2 tracking-tighter">
          <Gamepad2 className="text-indigo-500" size={32} />
          GAMING<span className="text-indigo-500 neon-text">PRO</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/products" className="hover:text-indigo-400 transition">Store</Link>
          <Link to="/history" className="hover:text-indigo-400 transition flex items-center gap-1">
            <History size={14}/> My History
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex gap-4 items-center">
          <Link to="/login" className="bg-white/5 p-2 rounded-full border border-white/10 hover:bg-indigo-600 transition">
            <User size={20} className="text-white" />
          </Link>
          <button className="relative bg-indigo-600 p-2 rounded-lg hover:bg-indigo-500 transition shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <ShoppingCart size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-white text-indigo-600 text-[10px] font-bold rounded-full px-1.5">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;