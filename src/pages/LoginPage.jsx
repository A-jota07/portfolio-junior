import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginAdmin } from '../lib/supabaseClient';
import { Terminal, Lock, Mail, ArrowRight, ShieldCheck, Key, Sparkles, AlertTriangle, CornerDownLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await loginAdmin(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMsg(res.error || 'Authentication failed');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@dev.tech');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#070510] text-[#e2e8f0] font-mono flex items-center justify-center p-4 bg-studio-grid relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#9d4edd]/30 to-[#f72585]/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main Terminal Login Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#0c091d]/95 border border-[#9d4edd]/40 shadow-2xl shadow-[#9d4edd]/20 overflow-hidden backdrop-blur-xl">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#080514] border-b border-[#9d4edd]/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-xs text-slate-400 font-mono ml-2">// auth.admin_terminal</span>
          </div>

          <Link
            to="/"
            className="text-xs font-mono text-slate-400 hover:text-[#c77dff] transition-colors"
          >
            ← Public Site
          </Link>
        </div>

        {/* Login Form Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex p-3 rounded-full bg-[#18103c] border border-[#9d4edd]/30 text-[#f72585] mb-1">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold font-mono text-white tracking-wide">
              &gt;&gt; Admin Authentication
            </h1>
            <p className="text-xs text-[#c77dff] font-mono">
              // Enter credentials to access Supabase CRUD Dashboard
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <span>// email_address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dev.tech"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded-lg py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#c77dff] focus:ring-1 focus:ring-[#c77dff]/50 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <span>// master_password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded-lg py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#c77dff] focus:ring-1 focus:ring-[#c77dff]/50 transition-all font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-mono text-xs font-bold bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-lg shadow-[#9d4edd]/30 transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>// AUTHENTICATING...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>// ACCESS_ADMIN_DASHBOARD</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="pt-3 border-t border-[#9d4edd]/15 text-center">
            <button
              onClick={handleFillDemo}
              className="text-[11px] font-mono text-[#c77dff] hover:text-white flex items-center justify-center gap-1.5 mx-auto hover:underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>// Auto-fill Demo Admin Credentials</span>
            </button>
            <p className="text-[10px] text-slate-500 font-mono mt-1">
              Demo Login: <code className="text-slate-300">admin@dev.tech</code> / <code className="text-slate-300">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
