
import React, { useState } from 'react';

interface StepFillBlanksProps {
  onNext: () => void;
  isFullscreen?: boolean;
}

const StepFillBlanks: React.FC<StepFillBlanksProps> = ({ onNext, isFullscreen }) => {
  const [inputs, setInputs] = useState({
    p1: '',
    p2: '',
    p3: '',
    p4: ''
  });
  
  const [checked, setChecked] = useState(false);

  const answers = {
    p1: 'energy',
    p2: 'gas',
    p3: 'calories',
    p4: 'fat'
  };

  const isCorrect = (key: keyof typeof answers) => {
    return inputs[key].toLowerCase().trim() === answers[key];
  };

  const allCorrect = Object.keys(answers).every(key => isCorrect(key as keyof typeof answers));

  return (
    <div className={`text-center animate-fadeIn w-full transition-all duration-500 ${isFullscreen ? 'max-w-6xl' : 'max-w-4xl'}`}>
      <h2 className={`font-black mb-8 ${isFullscreen ? 'text-6xl' : 'text-3xl md:text-5xl'}`}>Code Breaker: The Core Message</h2>
      
      <div className={`p-8 md:p-12 rounded-[3rem] shadow-2xl mb-8 border-t-[12px] transition-all duration-500 ${
        isFullscreen ? 'bg-slate-800 text-white border-indigo-500' : 'bg-white text-slate-900 border-indigo-600'
      }`}>
        <div className={`leading-relaxed md:leading-[1.7] text-left font-bold space-y-6 transition-all duration-500 ${
          isFullscreen ? 'text-4xl' : 'text-xl md:text-3xl'
        }`}>
          <p>
            Breakfast gives 
            <input 
              type="text" 
              value={inputs.p1}
              onChange={(e) => setInputs({...inputs, p1: e.target.value})}
              className={`inline-block mx-4 border-b-8 text-center outline-none transition-all bg-transparent ${
                isFullscreen ? 'w-64' : 'w-32 md:w-48'
              } ${
                checked ? (isCorrect('p1') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400') : 'border-slate-600 focus:border-indigo-400'
              }`}
              placeholder="???"
            />
            to your brain and body.
          </p>
          
          <p>
            Like a car needs 
            <input 
              type="text" 
              value={inputs.p2}
              onChange={(e) => setInputs({...inputs, p2: e.target.value})}
              className={`inline-block mx-4 border-b-8 text-center outline-none transition-all bg-transparent ${
                isFullscreen ? 'w-56' : 'w-32 md:w-40'
              } ${
                checked ? (isCorrect('p2') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400') : 'border-slate-600 focus:border-indigo-400'
              }`}
              placeholder="???"
            />
            , your body needs food.
          </p>
          
          <p>
            Food gives 
            <input 
              type="text" 
              value={inputs.p3}
              onChange={(e) => setInputs({...inputs, p3: e.target.value})}
              className={`inline-block mx-4 border-b-8 text-center outline-none transition-all bg-transparent ${
                isFullscreen ? 'w-64' : 'w-32 md:w-48'
              } ${
                checked ? (isCorrect('p3') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400') : 'border-slate-600 focus:border-indigo-400'
              }`}
              placeholder="???"
            />
            , this is energy.
          </p>
          
          <p>
            Extra calories become 
            <input 
              type="text" 
              value={inputs.p4}
              onChange={(e) => setInputs({...inputs, p4: e.target.value})}
              className={`inline-block mx-4 border-b-8 text-center outline-none transition-all bg-transparent ${
                isFullscreen ? 'w-56' : 'w-32 md:w-40'
              } ${
                checked ? (isCorrect('p4') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400') : 'border-slate-600 focus:border-indigo-400'
              }`}
              placeholder="???"
            />
            .
          </p>
        </div>
      </div>

      {!allCorrect ? (
        <button
          onClick={() => setChecked(true)}
          className={`bg-amber-500 text-white rounded-full font-black shadow-2xl hover:bg-amber-600 hover:scale-110 active:scale-95 transition-all ${
            isFullscreen ? 'px-16 py-8 text-4xl' : 'px-10 py-4 text-xl'
          }`}
        >
          Check My Answers 🔎
        </button>
      ) : (
        <div className="flex flex-col items-center animate-bounce-in">
           <div className={`font-black text-green-500 mb-8 flex items-center gap-4 transition-all ${isFullscreen ? 'text-6xl' : 'text-4xl'}`}>
             <span>✨</span> MESSAGE DECODED! <span>✨</span>
           </div>
           <button
             onClick={onNext}
             className={`bg-indigo-600 text-white rounded-full font-black shadow-2xl hover:bg-indigo-700 hover:scale-105 transition-all ${
               isFullscreen ? 'px-20 py-10 text-5xl' : 'px-12 py-5 text-2xl'
             }`}
           >
             Continue Mission →
           </button>
        </div>
      )}
      
      {checked && !allCorrect && (
        <p className={`mt-8 text-red-400 font-black animate-pulse transition-all ${isFullscreen ? 'text-3xl' : 'text-lg'}`}>
          Keep trying! Check your spelling: Energy, Gas, Calories, Fat.
        </p>
      )}
    </div>
  );
};

export default StepFillBlanks;
