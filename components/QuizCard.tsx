import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Question, QuizContent } from '../types';
import { playCorrect, playWrong, playWhoosh, playClick } from '../utils/sound';
import { LOGO_URL } from '../constants';
import { Check, X, ArrowRight } from 'lucide-react';

interface Props {
  question: Question;
  currentNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  ui: QuizContent['ui'];
}

const QuizCard: React.FC<Props> = ({ question, currentNumber, totalQuestions, onAnswer, ui }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userIsCorrect, setUserIsCorrect] = useState(false);
  
  // Drag state
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset state when question changes
  useEffect(() => {
    setHasAnswered(false);
    setUserIsCorrect(false);
    setDragDelta({ x: 0, y: 0 });
    setDragStart(null);
    setIsDragging(false);
  }, [question]);

  // --- Logic ---

  const handleDecision = (userSwipedRight: boolean) => {
    const isCorrect = userSwipedRight === question.isTrue;
    
    // Play sound & Confetti
    if (isCorrect) {
      playCorrect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#198b81', '#ee8021', '#ffffff', '#000000'],
        disableForReducedMotion: true,
        zIndex: 100,
      });
    } else {
      playWrong();
    }

    setUserIsCorrect(isCorrect);
    setHasAnswered(true);
  };

  const handleNext = () => {
    playClick();
    onAnswer(userIsCorrect);
  };

  // --- Touch/Mouse Handlers ---

  const handlePointerDown = (e: React.PointerEvent) => {
    if (hasAnswered) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragDelta({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    const threshold = 80;

    if (dragDelta.x > threshold) {
      // SWIPE RIGHT -> TRUE
      setDragDelta({ x: 500, y: dragDelta.y }); // Animate out
      setTimeout(() => handleDecision(true), 200);
    } else if (dragDelta.x < -threshold) {
      // SWIPE LEFT -> FALSE
      setDragDelta({ x: -500, y: dragDelta.y }); // Animate out
      playWhoosh();
      setTimeout(() => handleDecision(false), 200);
    } else {
      // Snap back
      setDragDelta({ x: 0, y: 0 });
    }
  };

  const handleButtonDecision = (isTrue: boolean) => {
    if (hasAnswered) return;
    // Animate automatically
    setDragDelta({ x: isTrue ? 500 : -500, y: 0 });
    if (!isTrue) playWhoosh();
    setTimeout(() => handleDecision(isTrue), 200);
  };

  // --- Visuals ---

  const likeOpacity = Math.min(1, Math.max(0, dragDelta.x / 50)); // Right (True)
  const nopeOpacity = Math.min(1, Math.max(0, -dragDelta.x / 50)); // Left (False)

  return (
    <div className="w-full h-full flex flex-col px-4 items-center">
      
      {/* Progress Badge */}
      <div className="w-full max-w-md mb-4 relative z-20 flex justify-center">
        <div className="bg-[#198b81] text-white px-4 py-1 rounded-full border-2 border-black shadow-comic-sm transform -rotate-1">
            <span className="font-black text-sm tracking-widest uppercase">
              {ui.progress} {currentNumber} / {totalQuestions}
            </span>
        </div>
      </div>

      {/* CARD AREA */}
      <div className="flex-1 w-full relative flex items-center justify-center min-h-[360px] mb-4 z-0 perspective-1000">
        
        {/* Background Icons (Guides) */}
        {!hasAnswered && (
          <div className="absolute w-full max-w-[320px] flex justify-between px-0 opacity-30 pointer-events-none top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col items-center">
              <div className="bg-red-500 rounded-full p-2 text-white mb-2">
                 <X size={32} />
              </div>
              <span className="font-black text-xs uppercase text-red-600 tracking-wider bg-white px-1 rounded">{ui.falseBtn}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-500 rounded-full p-2 text-white mb-2">
                 <Check size={32} />
              </div>
              <span className="font-black text-xs uppercase text-green-600 tracking-wider bg-white px-1 rounded">{ui.trueBtn}</span>
            </div>
          </div>
        )}

        {/* FEEDBACK CARD (Shown after answer) */}
        {hasAnswered && (
          <div className="absolute w-[280px] min-h-[400px] bg-white rounded-2xl border-4 border-black shadow-comic-lg z-30 flex flex-col animate-pop">
             {/* Header Status */}
             <div className={`w-full py-4 text-center border-b-4 border-black ${userIsCorrect ? 'bg-[#198b81] text-white' : 'bg-[#ee8021] text-white'}`}>
                <h3 className="text-2xl font-black uppercase tracking-wider">
                  {userIsCorrect ? 'CORRECT!' : 'WRONG!'}
                </h3>
             </div>

             <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-xl md:text-2xl font-bold text-black leading-tight">
                  {question.feedback}
                </p>
             </div>

             <div className="p-4">
                <button 
                  onClick={handleNext}
                  className="w-full py-3 bg-black text-white rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-95 transition-transform"
                >
                  {ui.nextBtn} <ArrowRight size={20} />
                </button>
             </div>
          </div>
        )}

        {/* QUESTION CARD (Draggable) */}
        {!hasAnswered && (
          <div 
            ref={cardRef}
            className={`absolute w-[280px] min-h-[400px] bg-white rounded-2xl border-4 border-black shadow-comic-lg cursor-grab active:cursor-grabbing z-20 flex flex-col items-center p-6 text-center select-none touch-none`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
              transform: `translate(${dragDelta.x}px, ${dragDelta.y}px) rotate(${dragDelta.x * 0.05}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {/* Overlay: TRUE (Green/Right) */}
            <div className="absolute top-6 left-6 border-4 border-[#198b81] text-[#198b81] rounded-lg px-2 py-1 transform -rotate-12 font-black text-4xl uppercase opacity-0 pointer-events-none bg-white/80 backdrop-blur-sm z-50"
                 style={{ opacity: likeOpacity }}>
              {ui.trueBtn}
            </div>

            {/* Overlay: FALSE (Red/Left) */}
            <div className="absolute top-6 right-6 border-4 border-[#e93d3d] text-[#e93d3d] rounded-lg px-2 py-1 transform rotate-12 font-black text-4xl uppercase opacity-0 pointer-events-none bg-white/80 backdrop-blur-sm z-50"
                 style={{ opacity: nopeOpacity }}>
              {ui.falseBtn}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full gap-4">
              <span className="text-2xl md:text-3xl font-black text-black leading-tight break-words drop-shadow-sm">
                {question.statement}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 w-full text-center">
              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest pointer-events-none flex justify-between px-2">
                 <span>&larr; {ui.falseBtn}</span>
                 <span>{ui.trueBtn} &rarr;</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Manual Buttons (Only show when not answered to prevent double tap) */}
      {!hasAnswered && (
        <div className="flex justify-center gap-6 mb-2 flex-shrink-0 relative z-30">
          <button 
            onClick={() => handleButtonDecision(false)}
            className="w-16 h-16 rounded-full bg-white border-2 border-black shadow-comic flex items-center justify-center text-[#e93d3d] hover:bg-gray-100 active:scale-95 transition-transform"
            aria-label="False"
          >
            <X size={32} strokeWidth={4} />
          </button>
          
          <button 
            onClick={() => handleButtonDecision(true)}
            className="w-16 h-16 rounded-full bg-[#198b81] border-2 border-black shadow-comic flex items-center justify-center text-white hover:bg-[#157a70] active:scale-95 transition-transform"
            aria-label="True"
          >
            <Check size={32} strokeWidth={4} />
          </button>
        </div>
      )}
      
      {hasAnswered && (
        <div className="h-16 mb-2"></div> /* Spacer to keep layout stable */
      )}

      {/* Logo Footer */}
      <div className="mt-4 mb-4 flex justify-center items-center flex-shrink-0 z-30">
         <img 
           src={LOGO_URL} 
           alt="Earthya Logo" 
           className="h-6 w-auto object-contain opacity-90"
         />
      </div>
    </div>
  );
};

export default QuizCard;