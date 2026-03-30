import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// NAYE ICONS: Eye aur EyeOff import kiye gaye hain
import { Gamepad2, Lock, Mail, User, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // NAYI STATE: Password dikhane ya chhupane ke liye
  const [showPassword, setShowPassword] = useState(false);
  
  // Custom Alert State
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Custom Alert Function
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Manual Validation: Check if fields are empty
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill in all fields! 🎮', 'error');
      return;
    }

    // 2. Manual Validation: Password length check
    if (password.length < 6) {
      showToast('Password must be at least 6 characters! 🔒', 'error');
      return;
    }

    // 3. Manual Validation: Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address!', 'error');
      return;
    }

    setLoading(true);

    try {
      // Firebase auth me user banayein
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // User ka naam update karein
      await updateProfile(user, { displayName: name });
      
      // Firestore me user ka wallet aur details save karein
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        walletBalance: 0, 
        createdAt: new Date()
      });

      // Account banne ke baad success msg aur redirect
      showToast('Account Initialized Successfully! 🔥', 'success');
      
      // Thoda delay dekar redirect karte hain taaki success message dikhe
      setTimeout(() => {
        setLoading(false); 
        navigate('/dashboard');
      }, 1500);
      
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        showToast('Ye email id pehle se register hai bhai! Login karo.', 'error');
      } else {
        showToast(err.message.replace("Firebase: ", ""), 'error');
      }
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center px-6 relative overflow-hidden pb-10 pt-10">
      
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

      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <Gamepad2 className="text-indigo-500" size={50} />
        </div>
        
        <h2 className="text-4xl font-black text-white text-center mb-2 uppercase">Create ID</h2>
        <p className="text-gray-500 text-center text-xs font-bold mb-8 uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-green-500"/> Secure Crypto Network
        </p>

        {/* Form pe noValidate lagaya hai taaki browser ke popups na aayein */}
        <form onSubmit={handleRegister} className="space-y-5" noValidate>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              id="name"
              name="name"
              autoComplete="username"
              placeholder="Gaming Name / Alias" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all" 
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email" 
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Secure Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all" 
            />
          </div>
          
          {/* PASSWORD FIELD WITH TOGGLE */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              // UPDATE: type ab state par nirbhar karta hai (text ya password)
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Strong Password (min 6 chars)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              // UPDATE: right padding badhai (pr-12) taaki text icon ke niche na aaye
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-indigo-500 transition-all" 
            />
            
            {/* NAYA: Hide/Unhide Button */}
            <button
              type="button" // Important: taaki form submit na ho
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50">
            {loading ? 'Processing...' : 'Initialize Account'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8 font-medium">
          Already a member? <Link to="/login" className="text-indigo-400 font-bold hover:text-white transition">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;