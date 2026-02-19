
import React from 'react';

interface StepHealthProps {
  onNext: () => void;
  isFullscreen?: boolean;
}

const StepHealth: React.FC<StepHealthProps> = ({ onNext, isFullscreen }) => {
  return (
    <div className={`text-center animate-fadeIn mx-auto transition-all duration-500 ${isFullscreen ? 'max-w-7xl' : 'max-w-2xl'}`}>
      <h2 className={`font-black mb-10 transition-all ${isFullscreen ? 'text-7xl text-white' : 'text-3xl md:text-5xl'}`}>Health & Harmony</h2>
      
      <div className={`grid gap-8 mb-12 transition-all ${isFullscreen ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
        <div className={`p-10 rounded-[3rem] border-4 text-left shadow-2xl transition-all duration-500 ${
          isFullscreen ? 'bg-green-950/30 border-green-500/30' : 'bg-green-50 border-green-200'
        }`}>
          <div className={`mb-6 transition-all ${isFullscreen ? 'text-8xl' : 'text-5xl'}`}>🛡️</div>
          <h3 className={`font-black mb-4 transition-all ${isFullscreen ? 'text-4xl text-green-400' : 'text-2xl text-green-900'}`}>A Little Fat is Good</h3>
          <p className={`font-medium transition-all ${isFullscreen ? 'text-2xl text-green-100/70' : 'text-green-800'}`}>
            It protects your organs, keeps you warm, and acts as backup energy for when you're super busy.
          </p>
        </div>
        
        <div className={`p-10 rounded-[3rem] border-4 text-left shadow-2xl transition-all duration-500 ${
          isFullscreen ? 'bg-red-950/30 border-red-500/30' : 'bg-red-50 border-red-200'
        }`}>
          <div className={`mb-6 transition-all ${isFullscreen ? 'text-8xl' : 'text-5xl'}`}>⚠️</div>
          <h3 className={`font-black mb-4 transition-all ${isFullscreen ? 'text-4xl text-red-400' : 'text-2xl text-red-900'}`}>Too Much is Not Healthy</h3>
          <p className={`font-medium transition-all ${isFullscreen ? 'text-2xl text-red-100/70' : 'text-red-800'}`}>
            Excess storage can make it harder for your heart and body to work properly. Balance is key!
          </p>
        </div>
      </div>

      <div className={`p-10 rounded-[3rem] border-4 mb-12 shadow-inner transition-all duration-500 ${
        isFullscreen ? 'bg-slate-800 border-indigo-500/20' : 'bg-amber-50 border-amber-200'
      }`}>
        <p className={`font-black italic transition-all ${isFullscreen ? 'text-4xl text-white' : 'text-amber-900 text-xl'}`}>
          "Breakfast gives energy to your brain and body."
        </p>
        <p className={`mt-6 transition-all ${isFullscreen ? 'text-2xl text-indigo-300' : 'text-amber-800 text-lg'}`}>
          Starting your day with a balanced meal helps you focus in class and have energy for recess!
        </p>
      </div>

      <button
        onClick={onNext}
        className={`bg-indigo-600 text-white rounded-full font-black shadow-2xl transition-all hover:bg-indigo-500 hover:scale-110 active:scale-95 ${
          isFullscreen ? 'px-24 py-10 text-5xl' : 'px-16 py-6 text-2xl'
        }`}
      >
        Final Challenge! 🏁
      </button>
    </div>
  );
};

export default StepHealth;
