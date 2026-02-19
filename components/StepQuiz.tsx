
import React, { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/geminiService';
import { QuizQuestion } from '../types';

interface StepQuizProps {
  onRestart: () => void;
  isFullscreen?: boolean;
}

const StepQuiz: React.FC<StepQuizProps> = ({ onRestart, isFullscreen }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const rawQuestions = await generateQuizQuestions();
        // Shuffle questions once gathered from AI
        setQuestions(shuffleArray(rawQuestions));
      } catch (e) {
        console.error("Failed to fetch questions", e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === questions[currentQIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 flex flex-col items-center">
        <div className={`animate-spin mb-8 transition-all ${isFullscreen ? 'text-[12rem] text-indigo-500' : 'text-6xl text-indigo-600'}`}>🌀</div>
        <p className={`font-black transition-all ${isFullscreen ? 'text-5xl text-white' : 'text-gray-600 text-xl'}`}>
          Gathering 20 Brain Challenges...
        </p>
        <p className={`mt-4 opacity-50 font-bold ${isFullscreen ? 'text-2xl' : 'text-sm'}`}>Consulting Gemini AI Intelligence</p>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={`text-center animate-bounce-in rounded-[4rem] shadow-2xl mx-auto transition-all duration-500 ${
        isFullscreen ? 'bg-indigo-900/40 p-24 max-w-5xl border-4 border-indigo-500/50' : 'bg-white p-12 max-w-lg border-b-8 border-indigo-600'
      }`}>
        <div className={`mb-8 transition-all ${isFullscreen ? 'text-[15rem]' : 'text-8xl'}`}>
          {percentage >= 80 ? '🥇' : percentage >= 50 ? '🥈' : '🥉'}
        </div>
        <h2 className={`font-black mb-6 transition-all ${isFullscreen ? 'text-8xl text-white' : 'text-4xl'}`}>
          {percentage === 100 ? 'PERFECT SCORE!' : 'Mission Complete!'}
        </h2>
        <p className={`mb-4 transition-all font-black uppercase tracking-widest ${isFullscreen ? 'text-4xl text-indigo-300' : 'text-xl text-gray-500'}`}>
          Challenge Results
        </p>
        <p className={`mb-12 transition-all ${isFullscreen ? 'text-7xl text-white' : 'text-3xl text-gray-800'}`}>
          <span className="font-black">{score}</span> / {questions.length} Correct
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={onRestart}
            className={`bg-indigo-600 text-white rounded-full font-black hover:bg-indigo-500 shadow-2xl transition-all hover:scale-110 active:scale-95 ${
              isFullscreen ? 'px-24 py-12 text-5xl' : 'px-10 py-4 text-2xl'
            }`}
          >
            Restart Adventure
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQIndex];

  return (
    <div className={`mx-auto animate-fadeIn transition-all duration-500 ${isFullscreen ? 'max-w-none w-full px-12' : 'max-w-2xl'}`}>
      <div className="flex justify-between items-end mb-10">
        <div className="text-left">
          <span className={`block font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 ${isFullscreen ? 'text-4xl' : 'text-sm'}`}>
            Challenge Progress
          </span>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`transition-all duration-300 rounded-full ${
                  i === currentQIndex ? 'bg-white scale-125' : 
                  i < currentQIndex ? 'bg-indigo-500' : 'bg-slate-700'
                } ${isFullscreen ? 'w-4 h-4' : 'w-2 h-2'}`}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className={`font-black text-white transition-all ${isFullscreen ? 'text-6xl' : 'text-2xl'}`}>
            {currentQIndex + 1} <span className="text-indigo-500">/ {questions.length}</span>
          </span>
        </div>
      </div>
      
      <div className={`p-10 md:p-20 rounded-[4rem] shadow-2xl transition-all duration-500 border-4 ${
        isFullscreen ? 'bg-slate-800 text-white border-indigo-500/30' : 'bg-white text-slate-900 border-indigo-100'
      }`}>
        <h3 className={`font-black mb-16 transition-all duration-500 ${isFullscreen ? 'text-6xl leading-tight' : 'text-2xl md:text-3xl'}`}>
          {q.question}
        </h3>
        
        <div className={`grid gap-8 transition-all ${isFullscreen ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {q.options.map((option, idx) => {
            let stateStyle = isFullscreen ? 'bg-slate-900/50 border-slate-700 hover:border-indigo-400' : 'bg-gray-50 hover:bg-indigo-50 border-gray-100';
            
            if (selectedOption !== null) {
              if (idx === q.correctAnswer) stateStyle = 'bg-green-600/20 border-green-500 text-green-400 scale-105 shadow-[0_0_40px_rgba(34,197,94,0.2)]';
              else if (idx === selectedOption) stateStyle = 'bg-red-600/20 border-red-500 text-red-400 scale-95 grayscale-[0.5]';
              else stateStyle = 'opacity-20 grayscale cursor-not-allowed';
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-10 rounded-[2.5rem] border-4 transition-all font-bold shadow-xl active:scale-95 ${stateStyle} ${
                  isFullscreen ? 'text-4xl' : 'text-xl'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`flex items-center justify-center rounded-2xl font-black ${
                    isFullscreen ? 'w-16 h-16 text-2xl' : 'w-10 h-10 text-lg'
                  } ${selectedOption === idx ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <div className="mt-16 animate-fadeIn">
            <div className={`p-10 rounded-[3rem] mb-12 transition-all shadow-inner border-4 ${
              selectedOption === q.correctAnswer 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            } ${isFullscreen ? 'text-4xl' : 'text-lg'}`}>
              <div className="flex items-start gap-6">
                <span className="text-6xl">{selectedOption === q.correctAnswer ? '✅' : '❌'}</span>
                <div>
                  <span className="font-black uppercase tracking-widest block mb-2">
                    {selectedOption === q.correctAnswer ? 'Brilliant!' : 'Learning Moment'}
                  </span>
                  <p className="font-medium leading-relaxed opacity-90">{q.explanation}</p>
                </div>
              </div>
            </div>
            <button
              onClick={nextQuestion}
              className={`w-full bg-indigo-600 text-white rounded-[3rem] font-black hover:bg-indigo-500 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                isFullscreen ? 'py-12 text-5xl' : 'py-6 text-2xl'
              }`}
            >
              {currentQIndex === questions.length - 1 ? 'Finish Challenge 🏁' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepQuiz;
