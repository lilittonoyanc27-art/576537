import React from 'react';
import { X, BookOpen, Sparkles, Check } from 'lucide-react';
import { SUBTITLES_DATA } from './data';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTimestamp?: (seconds: number) => void;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  onSelectTimestamp
}) => {
  if (!isOpen) return null;

  const keyWords = [
    { es: 'Perdonar / Perdóneme', hy: 'Ներել / Ներեցե՛ք ինձ', note: 'Forma cortés (usted)' },
    { es: 'Una broma', hy: 'Մի կատակ', note: 'Chiste o mofa divertida' },
    { es: 'A sus expensas', hy: 'Ձեր հաշվին', note: 'A costa de alguien' },
    { es: 'Volver a la mesa', hy: 'Վերադառնալ սեղանի մոտ', note: 'Verbo volver + destino' },
    { es: 'Algo más fuerte', hy: 'Ավելի թունդ մի բան', note: 'Bebida con más graduación' },
    { es: 'Al contrario', hy: 'Ընդհակառակը, հակառակը', note: 'Locución adverbial' },
    { es: 'Sentirse', hy: 'Իրեն զգալ', note: 'Verbo pronominal de estado' },
    { es: 'Inadecuada', hy: 'Անհամապատասխան', note: 'No apta para el cometido' },
    { es: 'Rechazo', hy: 'Մերժում / Խորշում', note: 'Aversión o no aceptación' },
    { es: 'Transpiración', hy: 'Քրտնարտադրություն, քրտինք', note: 'Sudor corporal' },
    { es: 'Te lo aseguro', hy: 'Հավատացնում եմ քեզ', note: 'Dar certeza o garantía' },
    { es: 'Tener éxito (tenía)', hy: 'Հաջողություն ունենալ (ուներ)', note: 'Pretérito imperfecto' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#650D24] via-[#52091c] to-[#3a0513] border-2 border-[#FFD166] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#650D24] border-b border-[#FFD166]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F47B20] flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-cinematic text-[#FFD166]">
                Glosario de la Escena — El Zorro
              </h3>
              <p className="text-xs text-[#FFF4E3]/80">
                Léxico, expresiones idiomáticas y gramática (Español ↔ Հայերեն)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#FFF4E3]/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Words Grid */}
          <div>
            <h4 className="text-sm font-bold font-cinematic text-[#FFD166] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD166]" />
              Palabras y giros lingüísticos clave
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {keyWords.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#4a0819]/80 border border-[#FFD166]/20 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#FFF4E3] text-sm">{item.es}</span>
                    <span className="text-[10px] text-[#FFD166] bg-[#650D24] px-1.5 py-0.5 rounded border border-[#FFD166]/30">
                      {item.note}
                    </span>
                  </div>
                  <span className="text-xs text-[#FFD166] font-armenian font-semibold mt-1">
                    {item.hy}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full scene dialogue lines */}
          <div>
            <h4 className="text-sm font-bold font-cinematic text-[#FFD166] uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#FFD166]" />
              Todas las frases de la escena con minutaje
            </h4>

            <div className="space-y-2">
              {SUBTITLES_DATA.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl bg-[#3b0613]/80 border border-white/10 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#FFD166] bg-[#650D24] px-2 py-0.5 rounded border border-[#FFD166]/30">
                        {sub.timeFormatted}
                      </span>
                      <span className="text-sm font-semibold text-[#FFF4E3]">
                        {sub.spanish}
                      </span>
                    </div>
                    <p className="text-xs text-[#FFD166] font-armenian mt-1 pl-1">
                      {sub.armenian}
                    </p>
                  </div>

                  {onSelectTimestamp && (
                    <button
                      onClick={() => {
                        onSelectTimestamp(sub.startTime);
                        onClose();
                      }}
                      className="text-xs text-[#FFD166] hover:text-white px-2 py-1 rounded bg-[#A61B2B] hover:bg-[#F47B20] transition-colors flex-shrink-0"
                    >
                      Ir
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#650D24]/80 border-t border-[#FFD166]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#FFD166] hover:bg-white text-[#650D24] font-bold text-xs transition-colors"
          >
            Cerrar glosario
          </button>
        </div>
      </div>
    </div>
  );
};
