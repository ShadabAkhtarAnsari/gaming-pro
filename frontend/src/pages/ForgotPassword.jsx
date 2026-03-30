import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Custom Alert State
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Custom Alert Function
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    // 4 second baad alert apne aap gayab ho jayega
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    // 1. Manual Validation: Check if email is empty
    if (!email || email.trim() === '') {
      showToast('Please enter your email! 📧', 'error'); // Aap is message ko kuch bhi rakh sakte hain
      return; // Yahin se process rok do
    }

    // 2. Manual Validation: Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address!', 'error');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      showToast('Password reset link sent! Check your inbox.', 'success');
      setEmail(''); 
    } catch (err) {
      showToast(err.message.replace("Firebase: ", ""), 'error');
    } finally {
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/10 blur-[150px] rounded-full"></div>
      
      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-4 rounded-full border border-white/10">
            <KeyRound className="text-red-500" size={40} />
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-white text-center mb-2 uppercase tracking-tighter">Recover Access</h2>
        <p className="text-gray-400 text-center text-sm font-medium mb-10 max-w-[80%] mx-auto">
          Enter your registered email address to receive a secure password reset link.
        </p>

        {/* NAYA: form me noValidate add kiya gaya hai */}
        <form onSubmit={handleReset} className="space-y-6" noValidate>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            {/* NAYA: required hata diya gaya hai taaki browser popup na aaye */}
            <input 
              type="email" 
              placeholder="Enter Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-50"
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 text-sm font-bold hover:text-white transition uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;