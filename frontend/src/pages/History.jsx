import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, Clock, CheckCircle2, XCircle, Search, Filter, CreditCard } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, success, pending, rejected

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }

    // Live listener for deposits collection
    const q = query(
      collection(db, "deposits"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(txns);
      setLoading(false);
    }, (error) => {
      console.error("History Fetch Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Status Badge Logic
  const getStatusStyle = (status) => {
    switch (status) {
      case 'success':
        return { bg: 'bg-green-500/10', text: 'text-green-500', icon: <CheckCircle2 size={14} />, label: 'Completed' };
      case 'pending':
      case 'pending_manual_verification':
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: <Clock size={14} />, label: 'Processing' };
      case 'rejected':
        return { bg: 'bg-red-500/10', text: 'text-red-500', icon: <XCircle size={14} />, label: 'Failed' };
      default:
        return { bg: 'bg-gray-500/10', text: 'text-gray-500', icon: <Clock size={14} />, label: 'Unknown' };
    }
  };

  const filteredTxns = transactions.filter(t => 
    filter === 'all' ? true : t.status.includes(filter)
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-28 px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition">
              <ArrowLeft size={20} className="text-gray-300" />
            </Link>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Txn <span className="text-indigo-500">History</span></h1>
          </div>
          <HistoryIcon className="text-indigo-500/50" size={24} />
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {['all', 'success', 'pending', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                filter === f ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white/5 border-white/10 text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* TRANSACTIONS LIST */}
        <div className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Loading Ledger...</p>
            </div>
          ) : filteredTxns.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
              <Search className="mx-auto text-gray-700 mb-4" size={40} />
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">No Transactions Found</p>
            </div>
          ) : (
            filteredTxns.map((txn) => {
              const style = getStatusStyle(txn.status);
              return (
                <div key={txn.id} className="gaming-card p-5 rounded-2xl border border-white/5 bg-gradient-to-r from-white/5 to-transparent hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center ${style.text} border border-white/5 shadow-inner`}>
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm tracking-tight">Deposit Funds</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">
                          {txn.createdAt?.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} • {txn.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-white italic">₹{txn.amountINR}</span>
                      <div className={`flex items-center gap-1 justify-end mt-1 text-[9px] font-black uppercase tracking-tighter ${style.text}`}>
                        {style.icon} {style.label}
                      </div>
                    </div>
                  </div>
                  
                  {/* Txn Details Expandable or Footer */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] text-gray-600 font-mono tracking-tighter">ID: {txn.orderId || txn.id}</span>
                    <span className="text-[9px] text-indigo-400/50 font-bold uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Details</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* REFRESH INFO */}
        {!loading && transactions.length > 0 && (
          <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-8">
            Pull down to refresh • Secure encrypted ledger
          </p>
        )}
      </div>
    </div>
  );
};

export default History;