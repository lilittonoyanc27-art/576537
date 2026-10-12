import React from 'react';
import { AppView } from './types';
import { Film, HelpCircle, BookOpen, Sparkles, Languages } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  quizScore?: { answered: number; correct: number } | null;
  onOpenVocab: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  quizScore,
  onOpenVocab
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#650D24]/85 border-b border-[#FFD166]/30 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('video')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Stylized Zorro sword/Z badge */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#A61B2B] via-[#650D24] to-[#F47B20] border-2 border-[#FFD166] flex items-center justify-center shadow-md shadow-[#F47B20]/30 group-hover:scale-105 transition-transform">
            <span className="font-cinematic text-2xl font-black text-[#FFD166] select-none tracking-tighter">
              Z
            </span>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#FFD166] rounded-full border border-[#650D24]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black font-cinematic text-[#FFD166] tracking-wider leading-none">
                EL ZORRO
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#A61B2B] text-[#FFF4E3] border border-[#FFD166]/30">
                Español & Հայերեն
              </span>
            </div>
            <p className="text-xs text-[#FFF4E3]/80 font-medium">
              Aprende español con el cine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('video')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentView === 'video'
                ? 'bg-[#FFD166] text-[#650D24] shadow-md font-bold'
                : 'text-[#FFF4E3]/80 hover:text-white hover:bg-[#A61B2B]/50'
            }`}
          >
            <Film className="w-4 h-4" />
            <span className="hidden sm:inline">Vídeo y Subtítulos</span>
            <span className="sm:hidden">Vídeo</span>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentView === 'quiz' || currentView === 'results'
                ? 'bg-[#FFD166] text-[#650D24] shadow-md font-bold'
                : 'text-[#FFF4E3]/80 hover:text-white hover:bg-[#A61B2B]/50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Cuestionario (12)</span>
          </button>

          {/* Quick Glossary button */}
          <button
            onClick={onOpenVocab}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-[#A61B2B]/60 hover:bg-[#F47B20] text-[#FFD166] hover:text-white border border-[#FFD166]/30 transition-all"
            title="Vocabulario clave y expresiones"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Glosario</span>
          </button>
        </div>
      </div>
    </header>
  );
};
