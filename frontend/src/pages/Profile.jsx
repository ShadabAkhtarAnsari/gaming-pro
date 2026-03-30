import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogOut, Camera, ShieldCheck, Settings, Mail } from 'lucide-react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, updateProfile, updatePassword, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // States for form inputs
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. Check User Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
      } else {
        navigate('/login'); // Agar logged in nahi hai toh wapas login pe bhejo
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 2. Handle Profile Info Update (Name & Avatar URL)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Firebase Auth update
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
      });

      // Firestore Database update (taaki baki jagah bhi naam change ho jaye)
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: name,
        photoURL: photoURL
      });

      setMessage('Profile updated successfully! 🔥');
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await updatePassword(user, newPassword);
      setMessage('Security key (Password) updated successfully! 🛡️');
      setNewPassword(''); // Field clear kar do
    } catch (err) {
      // Agar user bahut der pehle login hua tha toh security reason se error aayega
      if (err.code === 'auth/requires-recent-login') {
        setError('Please log out and log in again to change your password (Security measure).');
      } else {
        setError(err.message.replace("Firebase: ", ""));
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Command <span className="text-indigo-500">Center</span></h1>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-1">Manage Your Identity</p>
          </div>
          <button onClick={handleLogout} className="bg-red-500/10 text-red-500 p-3 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition" />
          </button>
        </div>

        {/* Status Messages */}
        {message && <div className="bg-green-500/10 border border-green-500/50 text-green-400 text-sm font-bold p-4 rounded-xl mb-6 flex items-center gap-2"><ShieldCheck size={18}/> {message}</div>}
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-bold p-4 rounded-xl mb-6">{error}</div>}

        {/* Profile Card */}
        <div className="gaming-card p-6 sm:p-8 rounded-3xl mb-8 border border-white/5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[#15151a] border-2 border-indigo-500 overflow-hidden flex items-center justify-center relative z-10">
                {photoURL ? (
                  <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-indigo-500" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-full border-2 border-[#050505] z-20">
                <Camera size={14} className="text-white" />
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-black uppercase tracking-wide">{name || 'Unknown Gamer'}</h2>
              <p className="text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-2 mt-1">
                <Mail size={14} /> {user.email}
              </p>
              <span className="inline-block mt-3 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/30">
                Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Update Info Form */}
          <div className="gaming-card p-6 rounded-3xl border border-white/5">
            <h3 className="text-lg font-black uppercase tracking-wide mb-6 flex items-center gap-2">
              <Settings size={20} className="text-indigo-500" /> Update Details
            </h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Gaming Alias</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Avatar Image URL</label>
                <div className="relative">
                  <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="https://example.com/avatar.png" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-white text-black font-black uppercase tracking-widest py-3 rounded-xl hover:bg-indigo-500 hover:text-white transition-all text-sm mt-2">
                Save Changes
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="gaming-card p-6 rounded-3xl border border-white/5">
            <h3 className="text-lg font-black uppercase tracking-wide mb-6 flex items-center gap-2">
              <Lock size={20} className="text-red-500" /> Security
            </h3>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 6 characters" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-red-500 transition-all" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-red-600/20 text-red-500 border border-red-500/30 font-black uppercase tracking-widest py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all text-sm mt-6">
                Update Password
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;