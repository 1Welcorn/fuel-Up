
import React from 'react';
import { LessonStep } from '../types';

interface ProgressBarProps {
  currentStep: LessonStep;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = Object.values(LessonStep);
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex gap-3 w-full mx-auto mb-12">
      {steps.map((step, idx) => (
        <div
          key={step}
          className={`rounded-full transition-all duration-700 shadow-sm flex-1 ${
            currentIndex === idx ? 'h-6 bg-indigo-400 animate-pulse ring-4 ring-indigo-500/30' : 
            idx < currentIndex ? 'h-4 bg-indigo-600' : 'h-4 bg-slate-700/20'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
