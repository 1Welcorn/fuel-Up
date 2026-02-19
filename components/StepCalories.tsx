
import React, { useState } from 'react';
import { BREAKFAST_FOODS } from '../constants';
import { FoodItem } from '../types';

interface StepCaloriesProps {
  onNext: () => void;
  isFullscreen?: boolean;
}

const StepCalories: React.FC<StepCaloriesProps> = ({ onNext, isFullscreen }) => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [plate, setPlate] = useState<FoodItem[]>([]);

  const addToPlate = (food: FoodItem) => {
    setPlate([...plate, food]);
    setTotalCalories(totalCalories + food.calories);
  };

  const clearPlate = () => {
    setPlate([]);
    setTotalCalories(0);
  };

  return (
    <div className={`text-center animate-fadeIn w-full transition-all duration-500 ${isFullscreen ? 'max-w-none px-4' : 'max-w-5xl'}`}>
      <h2 className={`font-black mb-4 transition-all ${isFullscreen ? 'text-6xl text-white' : 'text-3xl md:text-5xl text-slate-800'}`}>The Calorie Lab</h2>
      <p className={`mb-10 italic transition-all ${isFullscreen ? 'text-3xl text-slate-400' : 'text-xl text-slate-600'}`}>"Food gives calories, this is energy."</p>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch transition-all duration-500 ${isFullscreen ? 'max-w-none' : ''}`}>
        <div className={`p-10 rounded-[3.5rem] shadow-2xl border-4 transition-all duration-500 ${
          isFullscreen ? 'bg-slate-800 border-indigo-500/20' : 'bg-white border-slate-50'
        }`}>
          <h3 className={`font-black mb-8 uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${
            isFullscreen ? 'text-4xl text-indigo-300' : 'text-2xl text-slate-700'
          }`}>
            <span>🛒</span> Food Pantry
          </h3>
          <div className={`grid gap-6 transition-all ${isFullscreen ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-3'}`}>
            {BREAKFAST_FOODS.map(food => (
              <button
                key={food.id}
                onClick={() => addToPlate(food)}
                className={`group flex flex-col items-center gap-4 border-4 rounded-[2.5rem] transition-all text-center relative overflow-hidden active:scale-95 shadow-xl ${
                  isFullscreen 
                    ? 'p-8 bg-slate-900 border-slate-700 hover:border-indigo-500 hover:bg-indigo-900/40' 
                    : 'p-4 border-slate-100 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <span className={`group-hover:scale-125 transition-transform duration-300 ${isFullscreen ? 'text-8xl' : 'text-5xl'}`}>{food.icon}</span>
                <div>
                  <div className={`font-black transition-all ${isFullscreen ? 'text-2xl text-white' : 'text-lg text-slate-800'}`}>{food.name}</div>
                  <div className={`font-black text-indigo-400 transition-all ${isFullscreen ? 'text-xl' : 'text-sm'}`}>{food.calories} CAL</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`p-10 rounded-[3.5rem] shadow-2xl flex flex-col border-b-[12px] transition-all duration-500 ${
          isFullscreen ? 'bg-indigo-950 border-indigo-900' : 'bg-indigo-900 border-indigo-950'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`font-black uppercase tracking-widest transition-all ${isFullscreen ? 'text-4xl text-white' : 'text-2xl text-white'}`}>Active Plate</h3>
            <button 
              onClick={clearPlate} 
              className={`bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase transition-colors ${
                isFullscreen ? 'px-8 py-4 text-lg' : 'px-4 py-2 text-xs'
              }`}
            >
              Clear All 🗑️
            </button>
          </div>
          
          <div className={`flex-1 bg-white/5 rounded-[3rem] p-8 flex flex-wrap gap-6 content-start overflow-y-auto border-4 border-white/10 backdrop-blur-md transition-all ${
            isFullscreen ? 'min-h-[400px]' : 'min-h-[250px]'
          }`}>
            {plate.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-indigo-300 opacity-40">
                <span className={isFullscreen ? 'text-9xl mb-8' : 'text-6xl mb-4'}>🍽️</span>
                <span className={`font-black ${isFullscreen ? 'text-3xl' : 'text-lg'}`}>Plate is empty... add energy!</span>
              </div>
            ) : (
              plate.map((item, idx) => (
                <div key={idx} className={`bg-white/20 rounded-3xl animate-bounce-in shadow-2xl border border-white/20 flex items-center justify-center ${
                  isFullscreen ? 'w-32 h-32 text-7xl' : 'w-20 h-20 text-4xl'
                }`}>
                  {item.icon}
                </div>
              ))
            )}
          </div>

          <div className={`mt-10 p-8 bg-white/10 rounded-[2.5rem] border-2 border-white/20 shadow-inner transition-all ${isFullscreen ? 'scale-110' : ''}`}>
            <div className={`font-black uppercase tracking-[0.4em] text-indigo-300 mb-2 ${isFullscreen ? 'text-lg' : 'text-xs'}`}>Total Power Reserves</div>
            <div className="flex items-center justify-center gap-4">
               <span className={`font-black text-white transition-all ${isFullscreen ? 'text-9xl' : 'text-6xl'}`}>{totalCalories}</span>
               <span className={`font-bold text-indigo-400 transition-all ${isFullscreen ? 'text-4xl' : 'text-xl'}`}>CAL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 mb-20">
        <button
          onClick={onNext}
          disabled={totalCalories < 100}
          className={`rounded-full font-black transition-all shadow-2xl transform hover:scale-110 ${
            totalCalories < 100 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          } ${isFullscreen ? 'px-24 py-10 text-5xl' : 'px-12 py-5 text-2xl'}`}
        >
          {totalCalories < 100 ? 'Add at least 100 calories!' : 'Go to Balance Mission! →'}
        </button>
      </div>
    </div>
  );
};

export default StepCalories;
