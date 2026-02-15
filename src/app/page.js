"use client";
import React, { useState } from 'react';
import { Heart, Zap, ShieldAlert, Activity, ChevronRight, RefreshCcw } from 'lucide-react';

export default function MindEngineApp() {
  const [step, setStep] = useState('assessment');
  const [answers, setAnswers] = useState({ strength: 'logic', energy: 50, clarity: 80 });

  const cognitiveMap = {
    hero: answers.strength === 'logic' ? 'Thinking (Ti)' : 'Intuition (Ni)',
    demon: answers.strength === 'logic' ? 'Feeling (Fi)' : 'Sensing (Si)'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 font-sans">
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeIn 0.8s ease-out forwards; }
      `}</style>
      
      <header className="max-w-4xl mx-auto mb-8 border-b border-slate-800 pb-6 flex justify-between items-center text-left">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">MindEngine</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest mt-1 italic font-semibold">Cognitive OS / MVP v1.1</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">System Online</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto text-left">
        {step === 'assessment' ? (
          <div className="animate-in">
            <section className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-indigo-300 underline decoration-indigo-500/30">
                <Activity size={20} /> Initial Calibration
              </h2>
              <div className="space-y-8">
                <div>
                  <label className="text-sm text-slate-400 mb-4 block italic font-medium">1. ในสภาวะตึงเครียดที่สุด พฤติกรรมตอบสนองแรกของคุณคือ?</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => setAnswers({...answers, strength: 'logic'})} className={`p-5 rounded-2xl border-2 text-left transition-all ${answers.strength === 'logic' ? 'border-indigo-500 bg-indigo-600/10 shadow-[0_0_20px_rgba(79,70,229,0.2)] text-indigo-100' : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-400'}`}>
                      <h4 className="font-bold mb-1">วิเคราะห์ความถูกต้อง (Logic)</h4>
                      <p className="text-xs">ค้นหาตรรกะและประสิทธิภาพของระบบเป็นหลัก</p>
                    </button>
                    <button onClick={() => setAnswers({...answers, strength: 'intuition'})} className={`p-5 rounded-2xl border-2 text-left transition-all ${answers.strength === 'intuition' ? 'border-indigo-500 bg-indigo-600/10 shadow-[0_0_20px_rgba(79,70,229,0.2)] text-indigo-100' : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-400'}`}>
                      <h4 className="font-bold mb-1">มองหาความหมาย (Intuition)</h4>
                      <p className="text-xs">เห็นภาพรวม ความเป็นไปได้ และนัยสำคัญที่ซ่อนอยู่</p>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
                  <div>
                    <label className="text-xs text-slate-500 mb-2 block flex justify-between font-mono"><span>ENERGY LEVEL</span><span>{answers.energy}%</span></label>
                    <input type="range" value={answers.energy} onChange={(e) => setAnswers({...answers, energy: e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-2 block flex justify-between font-mono"><span>COGNITIVE CLARITY</span><span>{answers.clarity}%</span></label>
                    <input type="range" value={answers.clarity} onChange={(e) => setAnswers({...answers, clarity: e.target.value})} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                  </div>
                </div>
              </div>
              <button onClick={() => setStep('results')} className="w-full mt-10 p-5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)]">GENERATE COGNITIVE SYNTHESIS <ChevronRight size={20} /></button>
            </section>
          </div>
        ) : (
          <div className="animate-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-lg">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2"><Heart size={14} className="text-rose-500" /> Heart-State</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end"><span className="text-[10px] text-slate-500 font-mono text-left">BATTERY</span><span className="text-2xl font-mono text-indigo-400 font-bold">{answers.energy}%</span></div>
                  <div className="flex justify-between items-end"><span className="text-[10px] text-slate-500 font-mono text-left">CLARITY</span><span className="text-2xl font-mono text-cyan-400 font-bold">{answers.clarity}%</span></div>
                </div>
              </div>
              <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden text-left border-indigo-500/20">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 font-mono"><Zap size={14} className="text-indigo-400" /> Cognitive Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl"><p className="text-[9px] text-emerald-500 font-bold uppercase mb-1">Hero (01)</p><p className="font-semibold text-emerald-100 text-lg">{cognitiveMap.hero}</p></div>
                  <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl"><div className="flex justify-between"><p className="text-[9px] text-rose-400 font-bold uppercase mb-1">Demon (08)</p><span className="text-[8px] bg-rose-500 text-white px-1 rounded animate-pulse h-fit">DANGER</span></div><p className="font-semibold text-rose-200 text-lg">{cognitiveMap.demon}</p></div>
                </div>
                <div className="mt-8 p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl flex gap-3 shadow-inner">
                  <div className="text-rose-500"><ShieldAlert size={20} /></div>
                  <div className="text-xs text-rose-300 leading-relaxed font-medium">
                    <span className="font-black underline mr-1 uppercase">Shadow Risk:</span> 
                    {answers.energy < 30 ? "Shadow Activation High: 'Demon' taking over system control." : "System Stable: Awareness barrier is active."}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-8"><button onClick={() => setStep('assessment')} className="text-slate-600 text-[10px] flex items-center gap-2 hover:text-slate-300 transition-all uppercase tracking-[0.2em] font-bold py-2 px-4 rounded-full border border-slate-800 hover:border-slate-600"><RefreshCcw size={12} /> Recalibrate Baseline</button></div>
          </div>
        )}
      </main>
      <footer className="mt-16 text-center opacity-30"><div className="h-px w-12 bg-slate-700 mx-auto mb-4"></div><p className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-mono">Awareness Precedes Control</p></footer>
    </div>
  );
}
