import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3 seconds baad Login par bhej dega
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 flex flex-col items-center animate-pulse">
        <Gamepad2 className="text-indigo-500 mb-4" size={80} />
        <h1 className="text-5xl font-black text-white tracking-tighter">
          GAMING<span className="text-indigo-500 neon-text">PRO</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
          Loading Secure Network...
        </p>
      </div>
    </div>
  );
};

export default Splash;