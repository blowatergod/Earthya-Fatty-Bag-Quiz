import React, { useState } from 'react';
import { Language } from './types';
import { QUIZ_DATA } from './constants';
import LanguageSelector from './components/LanguageSelector';
import QuizCard from './components/QuizCard';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!language) return;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const currentQuiz = QUIZ_DATA[language];
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  return (
    // Outer container: Locks the viewport
    <div className="fixed inset-0 w-full h-[100dvh] bg-black flex items-center justify-center font-sans overflow-hidden">
       
       {/* Background for the empty space (Letterboxing) */}
       <div className="absolute inset-0 bg-brand-gradient opacity-60 blur-xl"></div>
       <div className="absolute inset-0 bg-comic-dots opacity-20 pointer-events-none"></div>

      {/* STRICT 9:16 CONTAINER 
          This logic ensures the app is ALWAYS 9:16. 
          If the screen is too tall, it leaves gaps top/bottom.
          If the screen is too wide, it leaves gaps left/right.
      */}
      <div 
        className="relative w-auto h-auto max-w-full max-h-full aspect-[9/16] shadow-2xl overflow-hidden flex flex-col z-10 bg-[#fffdf5]"
        style={{
          // Fallback for browsers that struggle with aspect-ratio + max-height combos
          height: 'min(100dvh, 177.78vw)', 
          width: 'min(100vw, 56.25dvh)' 
        }}
      >
        
        {/* Content Area */}
        <div className="flex-1 w-full h-full overflow-hidden relative flex flex-col">
          
          {/* Main Content Container with safe area padding */}
          <div className="flex-1 w-full h-full p-4 pb-12 flex flex-col justify-between">
            {/* Step 1: Language Selection */}
            {!language && (
              <LanguageSelector onSelect={handleLanguageSelect} />
            )}

            {/* Step 2: Quiz */}
            {language && !isFinished && (
              <QuizCard 
                question={QUIZ_DATA[language].questions[currentQuestionIndex]}
                currentNumber={currentQuestionIndex + 1}
                totalQuestions={QUIZ_DATA[language].questions.length}
                onAnswer={handleAnswer}
                ui={QUIZ_DATA[language].ui}
              />
            )}

            {/* Step 3: Result */}
            {language && isFinished && (
              <ResultCard 
                score={score}
                totalQuestions={QUIZ_DATA[language].questions.length}
                content={QUIZ_DATA[language].ui}
                onRetry={handleRetry}
              />
            )}
          </div>
        </div>

        {/* Footer Branding - Fixed at bottom of the 9:16 container */}
        <div className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-center z-50 border-t-2 border-black pointer-events-none">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase">Powered by Earthya</p>
        </div>
      </div>
    </div>
  );
};

export default App;