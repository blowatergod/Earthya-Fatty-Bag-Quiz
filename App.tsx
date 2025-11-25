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
    // Outer container: Full screen, centered with Dynamic Gradient
    <div className="min-h-[100dvh] w-full bg-brand-gradient flex items-center justify-center font-sans overflow-hidden relative">
       
       {/* Background Pattern Overlay */}
       <div className="absolute inset-0 bg-comic-dots pointer-events-none mix-blend-overlay opacity-30"></div>
       
       {/* Dynamic Floating Shapes (Decorations) */}
       <div className="absolute top-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full animate-float pointer-events-none blur-xl"></div>
       <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#ee8021] opacity-20 rounded-full animate-float-delayed pointer-events-none blur-2xl"></div>
       <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#198b81] opacity-20 rounded-full animate-float pointer-events-none blur-lg"></div>

      {/* Mobile Frame / Container */}
      <div className="relative w-full h-[100dvh] md:max-w-[400px] md:h-[800px] md:max-h-[90vh] bg-[#fdfdfd] md:rounded-3xl border-0 md:border-4 md:border-black shadow-none md:shadow-comic-lg overflow-hidden flex flex-col z-10">
        
        {/* Top Bar Decoration (Desktop Only) */}
        <div className="hidden md:flex absolute top-0 left-0 w-full h-8 bg-white z-50 border-b-2 border-black items-center justify-center">
           <div className="w-16 h-3 bg-black rounded-full"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#fffdf5]">
          
          <div className="min-h-full p-6 pt-12 pb-20 flex flex-col">
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

        {/* Footer Branding */}
        <div className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-center z-10 border-t-2 border-black">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase">Powered by Earthya</p>
        </div>
      </div>
    </div>
  );
};

export default App;