import React, { useState } from 'react';
import { SUBTITLES_DATA } from './data';
import { SubtitleItem } from './types';
import { 
  Play, 
  Languages, 
  Sparkles, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  BookOpen, 
  ArrowRight,
  Flame
} from 'lucide-react';

interface SubtitlesSectionProps {
  currentTime: number;
  onSeekTo: (seconds: number) => void;
  onStartQuiz: () => void;
}

export const SubtitlesSection: React.FC<SubtitlesSectionProps> = ({
  currentTime,
  onSeekTo,
  onStartQuiz
}) => {
  // Set of opened Armenian translations per subtitle id.
  // Default is EMPTY because requirement states:
  // "По умолчанию показывай только испанские субтитры."
  const [openTranslations, setOpenTranslations] = useState<Set<number>>(new Set());

  // Determine active subtitle based on video current time
  const getActiveSubtitleId = (): number | null => {
    for (const item of SUBTITLES_DATA) {
      if (currentTime >= item.startTime && currentTime < item.endTime) {
        return item.id;
      }
    }
    // If video is past the last recorded subtitle timestamp but before end:
    const lastItem = SUBTITLES_DATA[SUBTITLES_DATA.length - 1];
    if (currentTime >= lastItem.startTime && currentTime <= lastItem.endTime + 5) {
      return lastItem.id;
    }
    return null;
  };

  const activeId = getActiveSubtitleId();

  const toggleTranslation = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenTranslations(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRowClick = (item: SubtitleItem) => {
    // Tapping the row toggles the Armenian translation
    toggleTranslation(item.id);
  };

  const handleSeek = (seconds: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onSeekTo(seconds);
  };

  const toggleAll = (showAll: boolean) => {
    if (showAll) {
      setOpenTranslations(new Set(SUBTITLES_DATA.map(s => s.id)));
    } else {
      setOpenTranslations(new Set());
    }
  };

  return (
    <div className="w-full mt-6 flex flex-col gap-5">
      {/* Subtitles Header Box */}
      <div className="bg-gradient-to-r from-[#650D24] via-[#8c1735] to-[#650D24] rounded-2xl p-4 sm:p-5 border-2 border-[#FFD166]/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#FFD166]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F47B20] flex items-center justify-center text-white shadow-md">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-cinematic text-[#FFD166]">
                Subtítulos interactivos — Español & Hayeren
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF4E3]/80">
                Haz clic en cualquier frase para ver su traducción al armenio. Toca el botón de tiempo para saltar al fragmento exacto.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {openTranslations.size > 0 ? (
              <button
                onClick={() => toggleAll(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#A61B2B]/70 hover:bg-[#A61B2B] text-[#FFF4E3] border border-[#FFD166]/30 transition-all"
                title="Ocultar todas las traducciones al armenio"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Ocultar armenio</span>
              </button>
            ) : (
              <button
                onClick={() => toggleAll(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#A61B2B]/70 hover:bg-[#F47B20] text-[#FFF4E3] border border-[#FFD166]/30 transition-all"
                title="Mostrar todas las traducciones al armenio"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Mostrar todas</span>
              </button>
            )}
          </div>
        </div>

        {/* Subtitles List */}
        <div className="mt-4 space-y-3">
          {SUBTITLES_DATA.map((item) => {
            const isActive = activeId === item.id;
            const isOpen = openTranslations.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleRowClick(item)}
                className={`group relative rounded-xl transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8c1735] to-[#A61B2B] border-[#FFD166] shadow-lg shadow-[#F47B20]/30 scale-[1.01]'
                    : 'bg-[#4a0819]/80 hover:bg-[#5e0c21] border-[#FFD166]/20 hover:border-[#FFD166]/50'
                } p-3.5 sm:p-4`}
              >
                {/* Active marker indicator */}
                {isActive && (
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-8 bg-[#FFD166] rounded-r-md shadow-md animate-pulse" />
                )}

                <div className="flex items-start justify-between gap-3">
                  {/* Timestamp & Play button */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => handleSeek(item.startTime, e)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all shadow-sm ${
                        isActive
                          ? 'bg-[#FFD166] text-[#650D24] hover:bg-white hover:scale-105'
                          : 'bg-[#650D24] text-[#FFD166] hover:bg-[#F47B20] hover:text-white border border-[#FFD166]/30'
                      }`}
                      title={`Reproducir desde el segundo ${item.startTime}`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{item.timeFormatted}</span>
                    </button>
                  </div>

                  {/* Spanish Phrase */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-base sm:text-lg font-semibold tracking-wide transition-colors ${
                          isActive
                            ? 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] font-bold'
                            : 'text-[#FFF4E3] group-hover:text-[#FFD166]'
                        }`}
                      >
                        {item.spanish}
                      </p>
                      {isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD166] text-[#650D24] uppercase tracking-wider flex items-center gap-1">
                          <Flame className="w-3 h-3 text-[#A61B2B] fill-current" />
                          En pantalla
                        </span>
                      )}
                    </div>

                    {/* Armenian Translation - Displayed ONLY when clicked */}
                    {isOpen && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#FFD166]/25 animate-fadeIn">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-[#FFD166] bg-[#650D24]/90 px-1.5 py-0.5 rounded border border-[#FFD166]/30 font-mono">
                            ՀԱՅ
                          </span>
                          <p className="text-sm sm:text-base text-[#FFD166] font-medium font-armenian leading-relaxed">
                            {item.armenian}
                          </p>
                        </div>
                        {item.context && (
                          <p className="mt-1 text-xs text-[#FFF4E3]/70 italic pl-8">
                            💡 {item.context}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Toggle Armenian button indicator */}
                  <button
                    onClick={(e) => toggleTranslation(item.id, e)}
                    className="p-1.5 rounded-lg text-[#FFF4E3]/70 hover:text-[#FFD166] hover:bg-[#650D24]/60 transition-colors flex-shrink-0"
                    title={isOpen ? 'Ocultar traducción armenia' : 'Ver traducción armenia'}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#FFD166]" />
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-[#FFD166]/80 font-medium">
                        <span className="hidden sm:inline text-[11px]">Հայերեն</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent CTA Button: Comenzar el cuestionario */}
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#650D24] via-[#A61B2B] to-[#F47B20] rounded-2xl border-2 border-[#FFD166] shadow-2xl text-center relative overflow-hidden group">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FFD166]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#A61B2B]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-[#FFD166]/40 text-xs text-[#FFD166] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>Paso siguiente del aprendizaje</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-cinematic text-white tracking-wide mb-2">
            ¿Listo para poner a prueba tu español?
          </h3>
          <p className="text-sm text-[#FFF4E3]/90 mb-5 leading-relaxed">
            Responde las 12 preguntas interactivas basadas en el vocabulario, las expresiones y la gramática de esta escena de El Zorro.
          </p>

          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD166] via-[#F47B20] to-[#FFD166] bg-size-200 text-[#650D24] font-black text-base sm:text-lg tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/40 hover:shadow-[#FFD166]/30 cursor-pointer"
          >
            <span>Comenzar el cuestionario</span>
            <ArrowRight className="w-5 h-5 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
