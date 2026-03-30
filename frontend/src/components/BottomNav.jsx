import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, History, User, HelpCircle } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home size={22} /> },
    { name: 'Store', path: '/products', icon: <ShoppingCart size={22} /> },
    { name: 'History', path: '/history', icon: <History size={22} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={22} /> },
    { name: 'Profile', path: '/profile', icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-indigo-500/20 pb-safe pt-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto pb-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link key={item.name} to={item.path} className="flex flex-col items-center gap-1 p-2 w-16">
              <div className={`${isActive ? 'text-indigo-400 scale-110 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'text-gray-500 hover:text-gray-300'} transition-all duration-300`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold tracking-wider ${isActive ? 'text-indigo-400' : 'text-gray-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;