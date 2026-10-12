import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from './data';
import { QuizOption, QuizQuestion, UserAnswer } from './types';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Languages, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  Film,
  Award
} from 'lucide-react';

interface QuizViewProps {
  onFinishQuiz: (answers: UserAnswer[]) => void;
  onBackToVideo: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  onFinishQuiz,
  onBackToVideo
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Translation visibility toggles
  const [showQuestionTranslation, setShowQuestionTranslation] = useState(false);
  const [showExplanationTranslation, setShowExplanationTranslation] = useState(false);
  const [revealedOptionTranslations, setRevealedOptionTranslations] = useState<Set<string>>(new Set());

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return; // Prevent changing after answer confirmed

    const isCorrect = optionId === currentQuestion.correctOptionId;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      isCorrect
    };

    setUserAnswers(prev => [...prev.filter(a => a.questionId !== currentQuestion.id), newAnswer]);
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (isLastQuestion) {
      onFinishQuiz(userAnswers);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setShowQuestionTranslation(false);
      setShowExplanationTranslation(false);
      setRevealedOptionTranslations(new Set());
    }
  };

  const toggleOptionTranslation = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedOptionTranslations(prev => {
      const next = new Set(prev);
      if (next.has(optionId)) {
        next.delete(optionId);
      } else {
        next.add(optionId);
      }
      return next;
    });
  };

  const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion.id);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Top Bar with Navigation and Progress */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#650D24] to-[#420716] border border-[#FFD166]/30 shadow-lg">
        <button
          onClick={onBackToVideo}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#FFD166] hover:text-white bg-[#A61B2B]/60 hover:bg-[#A61B2B] transition-all border border-[#FFD166]/20"
        >
          <Film className="w-4 h-4" />
          <span>Ver el vídeo</span>
        </button>

        {/* Progress Display */}
        <div className="flex-1 max-w-md mx-2">
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#FFD166]">
            <span>Pregunta {currentIndex + 1} de {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#420716] rounded-full overflow-hidden border border-[#FFD166]/30 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#F47B20] to-[#FFD166] rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current score badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A61B2B]/80 text-[#FFD166] text-xs font-bold border border-[#FFD166]/30">
          <Award className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Aciertos: {userAnswers.filter(a => a.isCorrect).length}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#650D24] via-[#52091c] to-[#3a0513] border-2 border-[#FFD166]/40 p-5 sm:p-8 shadow-2xl shadow-black/50">
        {/* Ornate top badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A61B2B] border border-[#FFD166]/40 text-xs font-bold text-[#FFD166] uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          <span>Cuestionario de El Zorro</span>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <div 
            onClick={() => setShowQuestionTranslation(prev => !prev)}
            className="group cursor-pointer p-3 sm:p-4 rounded-2xl bg-[#4a0819]/60 hover:bg-[#5a0b20]/80 border border-[#FFD166]/20 transition-colors"
            title="Toca para ver u ocultar la traducción al armenio"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold font-cinematic text-[#FFF4E3] tracking-wide leading-snug group-hover:text-[#FFD166] transition-colors">
                {currentQuestion.id}. {currentQuestion.question}
              </h2>
              <span className="flex items-center gap-1 text-xs text-[#FFD166] bg-[#650D24] px-2 py-1 rounded-md border border-[#FFD166]/30 flex-shrink-0">
                <Languages className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Հայերեն</span>
              </span>
            </div>

            {/* Armenian Question Translation */}
            {showQuestionTranslation && (
              <div className="mt-3 pt-3 border-t border-[#FFD166]/20 animate-fadeIn">
                <p className="text-base sm:text-lg text-[#FFD166] font-medium font-armenian">
                  {currentQuestion.questionArmenian}
                </p>
              </div>
            )}
          </div>
          <p className="mt-1.5 text-[11px] text-[#FFF4E3]/60 italic pl-2">
            💡 Toca la pregunta para ver su traducción al armenio.
          </p>
        </div>

        {/* Options Grid (4 options: A, B, C, D) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
          {currentQuestion.options.map((opt: QuizOption) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === currentQuestion.correctOptionId;
            const isTranslationOpen = revealedOptionTranslations.has(opt.id);

            let cardStyles = 'bg-[#4a0819]/90 hover:bg-[#600c22] border-[#FFD166]/25 hover:border-[#FFD166] text-[#FFF4E3]';
            let badgeStyles = 'bg-[#650D24] text-[#FFD166] border-[#FFD166]/40';

            if (isAnswered) {
              if (isCorrect) {
                // Correct answer highlighted in GREEN per requirements
                cardStyles = 'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-950';
                badgeStyles = 'bg-emerald-600 text-white border-emerald-300';
              } else if (isSelected && !isCorrect) {
                // Incorrect answer highlighted in RED per requirements
                cardStyles = 'bg-red-950/90 border-red-500 text-red-100 ring-2 ring-red-500/50 shadow-lg shadow-red-950';
                badgeStyles = 'bg-red-600 text-white border-red-300';
              } else {
                cardStyles = 'bg-[#3b0613]/50 border-white/10 text-white/50 opacity-60';
              }
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`group relative rounded-2xl p-4 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${cardStyles} ${
                  !isAnswered ? 'hover:scale-[1.02] active:scale-[0.99]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm border ${badgeStyles}`}>
                      {opt.id}
                    </span>
                    <span className="text-base sm:text-lg font-semibold tracking-wide font-armenian">
                      {opt.text}
                    </span>
                  </div>

                  {isAnswered && (
                    <div className="flex-shrink-0">
                      {isCorrect && (
                        <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-900/60 px-2 py-1 rounded-full border border-emerald-500/40">
                          <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-black" />
                          <span className="hidden sm:inline">Correcto</span>
                        </div>
                      )}
                      {isSelected && !isCorrect && (
                        <div className="flex items-center gap-1 text-red-400 font-bold text-xs bg-red-900/60 px-2 py-1 rounded-full border border-red-500/40">
                          <XCircle className="w-4 h-4 fill-red-500 text-black" />
                          <span className="hidden sm:inline">Incorrecto</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Option Armenian / Spanish translation toggle */}
                {opt.translation && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                    {isTranslationOpen ? (
                      <span className="text-xs text-[#FFD166] italic font-medium">
                        🔍 {opt.translation}
                      </span>
                    ) : (
                      <span className="text-[11px] text-white/40">
                        {/* Hidden by default */}
                      </span>
                    )}

                    <button
                      onClick={(e) => toggleOptionTranslation(opt.id, e)}
                      className="text-[11px] text-[#FFD166]/80 hover:text-[#FFD166] underline hover:no-underline ml-auto"
                      title="Ver traducción de la opción"
                    >
                      {isTranslationOpen ? 'Ocultar' : 'Traducción'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback and Explanation Box after Answer */}
        {isAnswered && (
          <div className="animate-fadeIn p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#650D24] to-[#420716] border-2 border-[#FFD166]/40 shadow-xl mb-6">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md ${
                selectedOptionId === currentQuestion.correctOptionId ? 'bg-emerald-600' : 'bg-red-600'
              }`}>
                {selectedOptionId === currentQuestion.correctOptionId ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-[#FFD166] font-cinematic">
                    {selectedOptionId === currentQuestion.correctOptionId ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                  </h4>

                  <button
                    onClick={() => setShowExplanationTranslation(prev => !prev)}
                    className="flex items-center gap-1 text-xs text-[#FFD166] hover:text-white bg-[#A61B2B] px-2.5 py-1 rounded-lg border border-[#FFD166]/30 transition-colors"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>{showExplanationTranslation ? 'Ocultar traducción armenia' : 'Explicación en armenio'}</span>
                  </button>
                </div>

                {/* Spanish Explanation */}
                <p className="mt-2 text-sm sm:text-base text-[#FFF4E3] leading-relaxed">
                  {currentQuestion.explanationEs}
                </p>

                {/* Armenian Explanation */}
                {showExplanationTranslation && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#FFD166]/20">
                    <p className="text-xs sm:text-sm text-[#FFD166] font-armenian leading-relaxed">
                      🇦🇲 {currentQuestion.explanationHy}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next Question Button */}
        {isAnswered && (
          <div className="flex items-center justify-end animate-fadeIn">
            <button
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#F47B20] via-[#FFD166] to-[#F47B20] text-[#650D24] font-black text-base sm:text-lg tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/40 hover:shadow-[#FFD166]/40 cursor-pointer"
            >
              <span>{isLastQuestion ? 'Ver resultados finales' : 'Siguiente pregunta'}</span>
              <ArrowRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
