import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// NAYE ICONS: Eye, EyeOff, CheckCircle2, AlertCircle add kiye hain
import { Gamepad2, Lock, Mail, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // NAYI STATE: Password aur Toast Alert ke liye
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Custom Alert Function
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Manual Validation: Check if fields are empty
    if (!email.trim() || !password.trim()) {
      showToast('Please fill in all fields! 🎮', 'error');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Success Custom Alert
      showToast('Authentication Successful! 🔥', 'success');
      
      // Thoda delay dekar redirect karte hain taaki success message dikhe
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard'); 
      }, 1500);

    } catch (err) {
      showToast("Invalid Email or Password. Try again.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center px-6 relative overflow-hidden">
      
      {/* --- CUSTOM TOAST ALERT UI --- */}
      <div 
        className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${
          toast.show ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
        }`}
      >
        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${
          toast.type === 'success' 
            ? 'bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.2)]' 
            : 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
        </div>
      </div>
      {/* ----------------------------- */}

      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      
      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="flex justify-center mb-10">
          <Gamepad2 className="text-indigo-500" size={60} />
        </div>
        
        <h2 className="text-4xl font-black text-white text-center mb-2 uppercase">Welcome Back</h2>
        <p className="text-gray-500 text-center text-sm font-bold mb-10 uppercase tracking-widest">Login to Access Services</p>

        {/* Form pe noValidate lagaya hai taaki browser ke warnings na aayein */}
        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            {/* required attribute hata diya hai */}
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors" 
            />
          </div>
          
          {/* PASSWORD FIELD WITH TOGGLE */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              // right padding badhai (pr-12) taaki text icon ke niche na aaye
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-indigo-500 transition-colors" 
            />
            
            {/* NAYA: Hide/Unhide Button */}
            <button
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end -mt-2">
            <Link to="/forgot-password" className="text-xs font-bold text-gray-500 hover:text-indigo-400 transition">Lost Password?</Link>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8 font-medium">
          New here? <Link to="/register" className="text-indigo-400 font-bold hover:text-white transition">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;