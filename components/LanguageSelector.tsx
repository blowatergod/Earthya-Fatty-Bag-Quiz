import React from 'react';
import { Language } from '../types';
import { MASCOT_URL } from '../constants';
import { playClick } from '../utils/sound';

interface Props {
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  
  const handleSelect = (lang: Language) => {
    playClick();
    onSelect(lang);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center animate-fade-in-up gap-4 py-6">
      
      {/* Top Section: Mascot & Title */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
        {/* Mascot Container */}
        <div className="relative mb-4 transform hover:scale-105 transition-transform duration-300 flex-shrink-1">
           <img 
             src={MASCOT_URL} 
             alt="Fatty Bag Mascot" 
             className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg"
           />
           <div className="absolute -top-4 -right-6 bg-white border-2 border-black px-3 py-1 rounded-xl shadow-comic-sm -rotate-12">
              <span className="font-bold text-[#ee8021]">Hi!</span>
           </div>
        </div>
        
        <div className="bg-white border-4 border-black p-3 shadow-comic transform -rotate-1 w-full text-center flex-shrink-0">
          <h1 className="font-black text-black tracking-tight uppercase leading-none">
            <span className="block text-lg mb-1">Fatty Bag’s Mini Quiz</span>
            <span className="block text-2xl text-[#198b81]">肥袋的小测验</span>
          </h1>
        </div>
      </div>

      <div className="flex-shrink-0 text-center px-4 mb-2">
         <p className="text-black text-sm md:text-base font-bold leading-tight">
          Choose your language to start feeding Fatty Bag correct answers!
        </p>
      </div>

      {/* Buttons Section */}
      <div className="w-full space-y-3 px-2 flex-shrink-0 pb-8">
        <button
          onClick={() => handleSelect('en')}
          className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex justify-between items-center group"
        >
          <span className="font-black text-lg text-black group-hover:text-[#198b81]">English</span>
          <span className="text-xs font-black bg-black text-white px-2 py-1 rounded">EN</span>
        </button>

        <button
          onClick={() => handleSelect('zh')}
          className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex justify-between items-center group"
        >
          <span className="font-black text-lg text-black group-hover:text-[#198b81]">中文</span>
          <span className="text-xs font-black bg-black text-white px-2 py-1 rounded">CN</span>
        </button>

        <button
          onClick={() => handleSelect('bm')}
          className="w-full p-3 bg-white border-2 border-black rounded-xl shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex justify-between items-center group"
        >
          <span className="font-black text-lg text-black group-hover:text-[#198b81]">Bahasa Melayu</span>
          <span className="text-xs font-black bg-black text-white px-2 py-1 rounded">BM</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;