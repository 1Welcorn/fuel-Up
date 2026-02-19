
import React, { useState, useEffect } from 'react';
import { ACTIVITIES } from '../constants';

interface StepBalanceProps {
  onNext: () => void;
  isFullscreen?: boolean;
}

const StepBalance: React.FC<StepBalanceProps> = ({ onNext, isFullscreen }) => {
  const [intake, setIntake] = useState(500);
  const [activityIndex, setActivityIndex] = useState(1);
  const [balance, setBalance] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const currentActivity = ACTIVITIES[activityIndex];
  
  useEffect(() => {
    setBalance(intake - currentActivity.burnRate * 4); // 4 hours of activity for simulation
  }, [intake, activityIndex]);

  const handleActivityClick = (idx: number) => {
    setActivityIndex(idx);
    setIsReportOpen(true);
  };

  const getStatus = () => {
    if (balance > 400) return { emoji: '🍔', label: 'Storage Mode', color: 'text-amber-400' };
    if (balance < -200) return { emoji: '🪫', label: 'Power Deficit', color: 'text-red-400' };
    return { emoji: '🌟', label: 'Optimal Zone', color: 'text-green-400' };
  };

  const status = getStatus();

  return (
    <div className={`text-center animate-fadeIn w-full transition-all duration-500 ${isFullscreen ? 'max-w-none px-4' : 'max-w-5xl'}`}>
      <h2 className={`font-black mb-4 transition-all ${isFullscreen ? 'text-7xl text-white' : 'text-3xl md:text-5xl text-slate-800'}`}>The Balancing Act</h2>
      <p className={`mb-12 italic transition-all ${isFullscreen ? 'text-3xl text-slate-400' : 'text-xl text-slate-600'}`}>"You need more or less calories depending on your body and activities."</p>

      <div className={`p-10 md:p-14 rounded-[4rem] shadow-2xl flex flex-col lg:flex-row gap-16 items-center justify-between border-4 transition-all duration-500 ${
        isFullscreen ? 'bg-slate-800 border-indigo-500/20' : 'bg-white border-slate-50'
      }`}>
        <div className={`flex-1 w-full p-10 rounded-[3rem] shadow-inner transition-all ${isFullscreen ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <label className={`block font-black mb-8 uppercase tracking-widest transition-all ${isFullscreen ? 'text-3xl text-indigo-400' : 'text-xl text-slate-700'}`}>
            Energy Intake 🍕
          </label>
          <input 
            type="range" 
            min="100" 
            max="2000" 
            step="50"
            value={intake} 
            onChange={(e) => setIntake(parseInt(e.target.value))}
            className={`w-full bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500 transition-all ${isFullscreen ? 'h-10' : 'h-6'}`}
          />
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`font-black text-indigo-500 tracking-tighter transition-all ${isFullscreen ? 'text-9xl' : 'text-6xl'}`}>{intake}</span>
            <span className={`font-bold transition-all ${isFullscreen ? 'text-3xl text-slate-500' : 'text-lg text-slate-400'}`}>CALORIES</span>
          </div>
        </div>

        <div className={`font-black text-indigo-100 hidden lg:block transition-all ${isFullscreen ? 'text-9xl opacity-20' : 'text-6xl'}`}>
          ⚖️
        </div>

        <div className={`flex-1 w-full p-10 rounded-[3rem] shadow-inner transition-all ${isFullscreen ? 'bg-slate-900' : 'bg-slate-50'}`}>
          <label className={`block font-black mb-8 uppercase tracking-widest transition-all ${isFullscreen ? 'text-3xl text-indigo-400' : 'text-xl text-slate-700'}`}>
            Daily Activity 🏃
          </label>
          <div className={`grid gap-6 transition-all ${isFullscreen ? 'grid-cols-2' : 'grid-cols-2'}`}>
            {ACTIVITIES.map((act, idx) => (
              <button
                key={act.id}
                onClick={() => handleActivityClick(idx)}
                className={`flex flex-col items-center gap-4 rounded-[2rem] transition-all border-4 shadow-xl active:scale-95 ${
                  activityIndex === idx 
                    ? 'bg-indigo-600 border-indigo-400 text-white scale-105 shadow-indigo-500/30' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:border-indigo-400/30'
                } ${isFullscreen ? 'p-8' : 'p-5'}`}
              >
                <div className={isFullscreen ? 'text-7xl' : 'text-5xl'}>{act.icon}</div>
                <div className={`font-black uppercase tracking-widest ${isFullscreen ? 'text-lg' : 'text-[10px]'}`}>{act.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Modal Report */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-8 md:p-20 animate-fadeIn">
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
          
          <button 
            onClick={() => setIsReportOpen(false)}
            className="absolute top-10 right-10 text-white hover:text-indigo-400 transition-colors"
          >
            <span className="text-6xl md:text-8xl font-thin">&times;</span>
          </button>

          <div className="max-w-6xl w-full text-center space-y-12">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-[0.4em] text-indigo-400 mb-4">
              Real-Time Body Performance
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col items-center justify-center space-y-8 p-12 bg-white/5 rounded-[4rem] border-2 border-white/10 shadow-2xl animate-bounce-in">
                <div className="text-[12rem] md:text-[18rem] transition-transform duration-500 hover:scale-110 drop-shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
                  {status.emoji}
                </div>
                <div className={`text-5xl md:text-7xl font-black uppercase tracking-tighter ${status.color}`}>
                  {status.label}
                </div>
              </div>

              <div className="text-left space-y-10">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border-l-8 border-indigo-500">
                  <div className="text-indigo-300 font-black text-2xl uppercase tracking-widest mb-4">The Selection</div>
                  <div className="text-4xl md:text-5xl font-bold text-white flex items-center gap-6">
                    <span>{currentActivity.icon}</span>
                    <span>{currentActivity.name}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-8 rounded-[2.5rem] border-l-8 border-purple-500">
                  <div className="text-purple-300 font-black text-2xl uppercase tracking-widest mb-4">Energy Outcome</div>
                  <div className="text-3xl md:text-5xl font-medium text-slate-200 leading-tight">
                    {balance > 400 
                      ? "Extra calories become fat. A little fat is good, but too much is not healthy for your machine!"
                      : balance < -200 
                      ? "Not enough fuel for that much action! You might feel grumpy or tired. You need more fuel!"
                      : "Perfect balance! You have exactly enough fuel for your brain to learn and your body to play."
                    }
                  </div>
                </div>

                <button
                  onClick={() => setIsReportOpen(false)}
                  className="w-full py-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[3rem] font-black text-4xl shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                >
                  Return to Mission Control 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 mb-24">
        <button
          onClick={onNext}
          className={`bg-indigo-600 text-white rounded-full font-black shadow-2xl hover:bg-indigo-500 hover:scale-110 transition-all ${
            isFullscreen ? 'px-20 py-10 text-5xl' : 'px-14 py-6 text-3xl'
          }`}
        >
          Mission Briefing: Health →
        </button>
      </div>
    </div>
  );
};

export default StepBalance;
