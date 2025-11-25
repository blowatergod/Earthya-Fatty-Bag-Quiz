import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizContent } from '../types';
import { Copy, RotateCcw } from 'lucide-react';
import { MASCOT_URL } from '../constants';
import { playClick, playFanfare } from '../utils/sound';

interface Props {
  score: number;
  totalQuestions: number;
  content: QuizContent['ui'];
  onRetry: () => void;
}

const ResultCard: React.FC<Props> = ({ score, totalQuestions, content, onRetry }) => {
  const isPerfect = score === totalQuestions;

  useEffect(() => {
    if (isPerfect) {
      playFanfare();
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#198b81', '#ee8021', '#000000']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#198b81', '#ee8021', '#000000']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isPerfect]);

  const copyCode = () => {
    playClick();
    navigator.clipboard.writeText("EARTHYA10");
  };

  const handleRetry = () => {
    playClick();
    onRetry();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-scale-up w-full px-2 pt-8 pb-10 min-h-0">
      
      {/* Visual Header - Flexibly Sized */}
      <div className="relative mb-4 w-full flex justify-center flex-shrink-0">
         {/* Comic Burst Background */}
         <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-4 border-black ${isPerfect ? 'bg-[#198b81]' : 'bg-[#ee8021]'}`}
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
         </div>
         
         <img 
            src={MASCOT_URL} 
            alt="Mascot" 
            className={`relative z-10 w-40 h-40 object-contain drop-shadow-xl transform ${!isPerfect ? 'grayscale-[0.5]' : ''}`}
         />
      </div>

      <div className="bg-black text-white px-6 py-2 transform -rotate-2 shadow-comic border-2 border-white mb-4 flex-shrink-0">
        <h2 className="text-2xl font-black uppercase tracking-wider">
            {isPerfect ? content.resultSuccessTitle : content.resultFailTitle}
        </h2>
      </div>
      
      <div className="flex items-center gap-2 mb-4 font-black text-xl flex-shrink-0">
        <span>SCORE:</span>
        <span className={`px-3 py-1 border-2 border-black rounded ${isPerfect ? 'bg-[#198b81] text-white' : 'bg-white text-black'}`}>
            {score} / {totalQuestions}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center w-full px-4 mb-4">
        <p className="text-center text-black font-bold text-lg leading-tight border-2 border-dashed border-black/20 p-4 rounded-xl bg-white/50 w-full">
            {isPerfect ? content.resultSuccessMsg : content.resultFailMsg}
        </p>
      </div>

      {isPerfect ? (
        <div className="w-full animate-fade-in-up delay-200 flex-shrink-0">
          {/* Coupon Design */}
          <div className="relative bg-[#198b81] border-4 border-black p-1 shadow-comic mb-2 mx-2 transform rotate-1">
            {/* Cutout circles */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white border-r-4 border-black rounded-full z-10"></div>
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white border-l-4 border-black rounded-full z-10"></div>
            
            <div className="bg-white border-2 border-dashed border-black/30 p-4 flex flex-col items-center text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] mb-1 text-black">{content.redeemText}</span>
              <h3 className="text-2xl font-black text-[#ee8021] italic mb-2">10% OFF</h3>
              
              <button 
                onClick={copyCode}
                className="w-full bg-black text-white py-3 px-4 rounded font-mono text-lg font-bold flex items-center justify-center gap-3 hover:bg-[#333] active:scale-95 transition-all"
              >
                EARTHYA10
                <Copy size={16} className="text-[#ee8021]" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 flex-shrink-0">
            <button
            onClick={handleRetry}
            className="w-full py-4 bg-[#ee8021] border-2 border-black hover:bg-[#ff9940] text-black rounded-xl font-black text-xl shadow-comic hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2"
            >
            <RotateCcw size={24} strokeWidth={3} />
            {content.retryBtn}
            </button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;