
import React from 'react';

interface StepWelcomeProps {
  onNext: () => void;
  isFullscreen?: boolean;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext, isFullscreen }) => {
  return (
    <div className="text-center animate-fadeIn flex flex-col items-center">
      <div className={`transition-all duration-700 ${isFullscreen ? 'text-9xl mb-12' : 'text-6xl mb-6'}`}>🚀</div>
      <h1 className={`font-black mb-6 leading-tight transition-all duration-500 ${
        isFullscreen ? 'text-7xl text-white' : 'text-4xl text-gray-900'
      }`}>
        Mission: Fuel Up!
      </h1>
      <p className={`text-gray-400 mb-12 max-w-2xl mx-auto transition-all duration-500 ${
        isFullscreen ? 'text-3xl leading-relaxed' : 'text-lg'
      }`}>
        Your body is like a high-performance machine. To start your day right, you need the perfect fuel. Are you ready to learn how breakfast powers your life?
      </p>
      <button
        onClick={onNext}
        className={`bg-indigo-600 text-white rounded-full font-black hover:bg-indigo-700 transition-all shadow-2xl hover:scale-110 active:scale-95 ${
          isFullscreen ? 'px-16 py-8 text-4xl' : 'px-8 py-4 text-xl'
        }`}
      >
        Start Mission!
      </button>
    </div>
  );
};

export default StepWelcome;
