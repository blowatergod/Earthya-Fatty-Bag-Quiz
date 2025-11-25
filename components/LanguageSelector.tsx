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
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in-up">
      
      {/* Mascot Container */}
      <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
         <img 
           src={MASCOT_URL} 
           alt="Fatty Bag Mascot" 
           className="w-40 h-40 object-contain drop-shadow-lg"
         />
         {/* Comic speech bubble decoration behind or near */}
         <div className="absolute -top-4 -right-6 bg-white border-2 border-black px-3 py-1 rounded-xl shadow-comic-sm -rotate-12">
            <span className="font-bold text-[#ee8021]">Hi!</span>
         </div>
      </div>
      
      <div className="bg-white border-4 border-black p-4 mb-8 shadow-comic transform -rotate-1 w-full text-center">
        <h1 className="font-black text-black tracking-tight uppercase leading-none">
          <span className="block text-xl mb-1">Fatty Bag’s Mini Quiz</span>
          <span className="block text-3xl text-[#198b81]">肥袋的小测验</span>
        </h1>
      </div>

      <p className="text-black mb-8 text-center text-base font-bold px-8 leading-tight">
        Choose your language to start feeding Fatty Bag correct answers!
      </p>

      <div className="w-full space-y-4 px-2">
        <button
          onClick={() => handleSelect('en')}
          className="w-full p-4 bg-white border-2 border-black rounded-xl shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex justify-between items-center group"
        >
          <span className="font-black text-xl text-black group-hover:text-[#198b81]">English</span>
          <span className="text-sm font-black bg-black text-white px-2 py-1 rounded">EN</span>
        </button>

        <button
          onClick={() => handleSelect('zh')}
          className="w-full p-4 bg-white border-2 border-black rounded-xl shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex justify-between items-center group"
        >
          <span className="font-black text-xl text-black group-hover:text-[#198b81]">中文</span>
          <span className="text-sm font-black bg-black text-white px-2 py-1 rounded">CN</span>
        </button>

        <button
          onClick={() => handleSelect('bm')}
          className="w-full p-4 bg-white border-2 border-black rounded-xl shadow-comic hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex justify-between items-center group"
        >
          <span className="font-black text-xl text-black group-hover:text-[#198b81]">Bahasa Melayu</span>
          <span className="text-sm font-black bg-black text-white px-2 py-1 rounded">BM</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;