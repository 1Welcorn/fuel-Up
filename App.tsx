
import React, { useState, useEffect } from 'react';
import { LessonStep } from './types';
import ProgressBar from './components/ProgressBar';
import StepWelcome from './components/StepWelcome';
import StepAnalogy from './components/StepAnalogy';
import StepFillBlanks from './components/StepFillBlanks';
import StepCalories from './components/StepCalories';
import StepBalance from './components/StepBalance';
import StepHealth from './components/StepHealth';
import StepQuiz from './components/StepQuiz';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<LessonStep>(LessonStep.WELCOME);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextStep = () => {
    const steps = Object.values(LessonStep);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const restart = () => {
    setCurrentStep(LessonStep.WELCOME);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center py-8 transition-all duration-700 ${
      isFullscreen ? 'bg-slate-900 text-white px-12' : 'bg-slate-50 text-slate-900 px-4'
    }`}>
      <header className={`mb-8 w-full flex justify-between items-center transition-all duration-500 ${
        isFullscreen ? 'max-w-none px-8' : 'max-w-5xl px-0'
      }`}>
        <div className="text-left">
          <div className={`inline-block px-4 py-1.5 rounded-full shadow-sm border mb-2 ${
            isFullscreen ? 'bg-indigo-900/50 border-indigo-700' : 'bg-white border-gray-100'
          }`}>
            <span className={`font-bold uppercase tracking-widest ${isFullscreen ? 'text-indigo-300 text-sm' : 'text-indigo-500 text-[10px]'}`}>
              Nutrition Science 101
            </span>
          </div>
          <h1 className={`font-extrabold tracking-tight transition-all ${
            isFullscreen ? 'text-4xl md:text-6xl text-white' : 'text-2xl md:text-4xl text-slate-800'
          }`}>
            Fuel Up! Breakfast Adventure
          </h1>
        </div>
        
        <button 
          onClick={toggleFullscreen}
          className={`p-4 rounded-2xl transition-all hover:scale-110 flex items-center gap-3 border shadow-xl ${
            isFullscreen 
              ? 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500' 
              : 'bg-white border-slate-200 text-slate-600'
          }`}
          title="Toggle Fullscreen for Classroom Mode"
        >
          {isFullscreen ? (
            <><span className="text-3xl">🔲</span> <span className="font-black text-lg">Exit TV Mode</span></>
          ) : (
            <><span className="text-xl">📺</span> <span className="font-bold">TV Mode</span></>
          )}
        </button>
      </header>

      <main className={`w-full flex-1 flex flex-col items-center justify-center transition-all duration-500 ${
        isFullscreen ? 'max-w-none' : 'max-w-5xl'
      }`}>
        <div className={`w-full transition-all duration-500 ${isFullscreen ? 'max-w-7xl' : 'max-w-xl'}`}>
          <ProgressBar currentStep={currentStep} />
        </div>
        
        <div className={`w-full py-8 min-h-[600px] flex flex-col items-center justify-center transition-all duration-500 ${
          isFullscreen ? 'scale-100' : 'scale-100'
        }`}>
          {currentStep === LessonStep.WELCOME && <StepWelcome onNext={nextStep} isFullscreen={isFullscreen} />}
          {currentStep === LessonStep.ANALOGY && <StepAnalogy onNext={nextStep} isFullscreen={isFullscreen} />}
          {currentStep === LessonStep.FILL_BLANKS && <StepFillBlanks onNext={nextStep} isFullscreen={isFullscreen} />}
          {currentStep === LessonStep.CALORIES && <StepCalories onNext={nextStep} isFullscreen={isFullscreen} />}
          {currentStep === LessonStep.BALANCE && <StepBalance onNext={nextStep} isFullscreen={isFullscreen} />}
          {currentStep === LessonStep.HEALTH && <StepHealth onNext={nextStep} isFullscreen={isFullscreen} />}
          {currentStep === LessonStep.QUIZ && <StepQuiz onRestart={restart} isFullscreen={isFullscreen} />}
        </div>
      </main>

      {!isFullscreen && (
        <footer className="mt-auto pt-12 text-gray-400 text-sm">
          Powered by <span className="font-bold text-gray-500">Gemini Intelligence</span> &bull; Fuel Up! Lesson
        </footer>
      )}
    </div>
  );
};

export default App;
