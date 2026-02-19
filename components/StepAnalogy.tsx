
import React, { useState } from 'react';

interface StepAnalogyProps {
  onNext: () => void;
  isFullscreen?: boolean;
}

const StepAnalogy: React.FC<StepAnalogyProps> = ({ onNext, isFullscreen }) => {
  const [gasLevel, setGasLevel] = useState(20);
  const [isFueling, setIsFueling] = useState(false);
  const [isDriving, setIsDriving] = useState(false);

  const handleFuel = () => {
    if (gasLevel >= 100) return;
    setIsFueling(true);
    setTimeout(() => {
      setGasLevel(prev => Math.min(100, prev + 20));
      setIsFueling(false);
    }, 500);
  };

  const handleDrive = () => {
    if (gasLevel <= 0) return;
    setIsDriving(true);
    setTimeout(() => {
      setGasLevel(prev => Math.max(0, prev - 20));
      setIsDriving(false);
    }, 1000);
  };

  return (
    <div className={`text-center animate-fadeIn w-full transition-all duration-500 ${isFullscreen ? 'max-w-6xl' : 'max-w-3xl'}`}>
      <h2 className={`font-black mb-8 ${isFullscreen ? 'text-6xl' : 'text-3xl md:text-5xl'}`}>The Fuel Analogy</h2>
      
      <div className={`p-10 rounded-[3rem] shadow-2xl mb-10 border-4 relative overflow-hidden transition-all duration-500 ${
        isFullscreen ? 'bg-slate-800 text-white border-indigo-500/30' : 'bg-white text-slate-900 border-indigo-100'
      }`}>
        <div className="absolute top-0 right-0 p-6">
           <div className={`px-6 py-3 rounded-full font-black text-xl shadow-lg ${
             gasLevel > 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 animate-pulse'
           }`}>
             {gasLevel > 50 ? 'OPTIMAL' : 'LOW FUEL'}
           </div>
        </div>

        <p className={`font-bold mb-12 leading-tight transition-all duration-500 ${
          isFullscreen ? 'text-4xl' : 'text-2xl md:text-3xl'
        }`}>
          "Like a car needs gas, <br/>your body needs food."
        </p>
        
        <div className={`relative flex items-center justify-center mb-12 transition-all duration-500 ${isFullscreen ? 'h-72' : 'h-48'}`}>
          <div className="absolute bottom-0 w-full h-3 bg-slate-700/30 rounded-full"></div>
          
          <div className={`transition-all duration-700 transform ${isDriving ? 'translate-x-24' : ''} ${isFueling ? 'scale-125' : ''} ${
            isFullscreen ? 'text-[12rem]' : 'text-9xl'
          }`}>
            {gasLevel > 75 ? '🏎️' : gasLevel > 40 ? '🚗' : gasLevel > 10 ? '🚙' : '🚲'}
            {isDriving && <span className="absolute -left-16 bottom-8 text-6xl animate-pulse">💨</span>}
          </div>
        </div>

        <div className={`w-full h-16 rounded-3xl overflow-hidden relative border-4 shadow-inner transition-all ${
          isFullscreen ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          <div 
            className={`h-full transition-all duration-500 rounded-lg ${
              gasLevel > 60 ? 'bg-green-500' : gasLevel > 30 ? 'bg-yellow-400' : 'bg-red-500'
            }`}
            style={{ width: `${gasLevel}%` }}
          />
          <span className={`absolute inset-0 flex items-center justify-center font-black tracking-widest text-slate-800 transition-all ${
            isFullscreen ? 'text-3xl text-white' : 'text-xl'
          }`}>
            ENERGY TANK: {gasLevel}%
          </span>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-8 mx-auto mb-10 transition-all duration-500 ${isFullscreen ? 'max-w-3xl' : 'max-w-md'}`}>
        <button 
          onClick={handleFuel}
          disabled={isFueling || gasLevel >= 100}
          className={`group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] transition-all transform hover:scale-105 active:scale-95 shadow-2xl border-b-8 ${
            gasLevel >= 100 
              ? 'bg-slate-700 border-slate-800 cursor-not-allowed opacity-50 text-slate-400' 
              : 'bg-green-500 border-green-700 text-white'
          }`}
        >
          <span className={`group-hover:animate-bounce ${isFullscreen ? 'text-6xl' : 'text-4xl'}`}>⛽</span>
          <span className={`font-black uppercase tracking-wider ${isFullscreen ? 'text-2xl' : 'text-lg'}`}>Refuel (Eat)</span>
        </button>

        <button 
          onClick={handleDrive}
          disabled={isDriving || gasLevel <= 0}
          className={`group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] transition-all transform hover:scale-105 active:scale-95 shadow-2xl border-b-8 ${
            gasLevel <= 0 
              ? 'bg-slate-700 border-slate-800 cursor-not-allowed opacity-50 text-slate-400' 
              : 'bg-orange-500 border-orange-700 text-white'
          }`}
        >
          <span className={`group-hover:rotate-12 transition-transform ${isFullscreen ? 'text-6xl' : 'text-4xl'}`}>🏁</span>
          <span className={`font-black uppercase tracking-wider ${isFullscreen ? 'text-2xl' : 'text-lg'}`}>Burn Fuel (Move)</span>
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={gasLevel < 40}
        className={`rounded-full font-black transition-all shadow-2xl transform hover:scale-105 ${
          gasLevel < 40 
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-500'
        } ${isFullscreen ? 'px-20 py-8 text-4xl mt-6' : 'px-12 py-5 text-2xl'}`}
      >
        {gasLevel < 40 ? 'Fuel up to 40% to continue!' : 'Missions Awaits! →'}
      </button>
    </div>
  );
};

export default StepAnalogy;
