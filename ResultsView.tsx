import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from './data';
import { UserAnswer, QuizQuestion } from './types';
import { 
  Trophy, 
  RotateCcw, 
  Film, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Award, 
  Languages, 
  Star,
  Swords
} from 'lucide-react';

interface ResultsViewProps {
  userAnswers: UserAnswer[];
  onRetryQuiz: () => void;
  onWatchVideoAgain: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  userAnswers,
  onRetryQuiz,
  onWatchVideoAgain
}) => {
  const [filter, setFilter] = useState<'all' | 'errors' | 'correct'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const totalQuestions = QUIZ_QUESTIONS.length;
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Trigger celebratory confetti on high score
  useEffect(() => {
    if (percentage >= 60) {
      // First burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD166', '#F47B20', '#A61B2B', '#650D24', '#FFF4E3']
      });

      // Second burst after 400ms
      const timeout = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD166', '#F47B20', '#A61B2B']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD166', '#F47B20', '#A61B2B']
        });
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [percentage]);

  const toggleDetails = (qId: number) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const getRankInfo = () => {
    if (percentage === 100) {
      return {
        title: '¡Maestro Espadachín de El Zorro! ⚔️',
        desc: 'Dominio perfecto de todos los diálogos y la gramática del filme.',
        badgeColor: 'from-[#FFD166] to-[#F47B20] text-[#650D24]'
      };
    }
    if (percentage >= 75) {
      return {
        title: '¡Caballero Justiciero! 🗡️',
        desc: 'Excelente comprensión auditiva y léxica de la escena.',
        badgeColor: 'from-[#F47B20] to-[#A61B2B] text-white'
      };
    }
    if (percentage >= 50) {
      return {
        title: '¡Discípulo Aventurero! 🐎',
        desc: 'Buen progreso. Repasa los subtítulos con traducción y perfecciona tus respuestas.',
        badgeColor: 'from-[#A61B2B] to-[#650D24] text-white'
      };
    }
    return {
      title: '¡Iniciado en la Mansión de Don Diego! 🌹',
      desc: 'Vuelve a ver el fragmento y practica con las frases en español y armenio.',
      badgeColor: 'from-[#650D24] to-[#420716] text-[#FFD166]'
    };
  };

  const rank = getRankInfo();

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => {
    const ans = userAnswers.find(a => a.questionId === q.id);
    if (filter === 'errors') return ans && !ans.isCorrect;
    if (filter === 'correct') return ans && ans.isCorrect;
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* Hero Victory Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#650D24] via-[#7d1230] to-[#4a0819] border-2 border-[#FFD166] p-6 sm:p-10 shadow-2xl shadow-black/60 text-center overflow-hidden">
        {/* Decorative corner flourishes */}
        <div className="absolute top-4 left-4 text-[#FFD166]/20 font-cinematic text-5xl font-black select-none">
          Z
        </div>
        <div className="absolute bottom-4 right-4 text-[#FFD166]/20 font-cinematic text-5xl font-black select-none">
          Z
        </div>

        {/* Trophy icon */}
        <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#A61B2B] to-[#F47B20] border-4 border-[#FFD166] shadow-xl shadow-[#F47B20]/40 mb-5">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[#FFD166] animate-bounce" />
        </div>

        {/* Required Headline */}
        <h1 className="relative z-10 text-2xl sm:text-4xl font-black font-cinematic text-white tracking-wide mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          ¡Enhorabuena! Has terminado el desafío de El Zorro.
        </h1>

        {/* Rank Badge */}
        <div className={`relative z-10 inline-block px-5 py-2 rounded-full font-cinematic font-bold text-sm sm:text-base bg-gradient-to-r ${rank.badgeColor} shadow-lg mb-6 border border-[#FFD166]/40`}>
          {rank.title}
        </div>

        <p className="relative z-10 text-sm sm:text-base text-[#FFF4E3]/90 max-w-lg mx-auto mb-8 leading-relaxed">
          {rank.desc}
        </p>

        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8">
          {/* Correct count */}
          <div className="p-4 rounded-2xl bg-[#380512]/80 border border-[#FFD166]/30 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-black font-cinematic text-[#FFD166]">
              {correctCount} / {totalQuestions}
            </span>
            <span className="text-xs sm:text-sm text-[#FFF4E3]/75 mt-1 font-medium">
              Respuestas correctas
            </span>
          </div>

          {/* Percentage */}
          <div className="p-4 rounded-2xl bg-[#380512]/80 border border-[#FFD166]/30 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-black font-cinematic text-[#F47B20]">
              {percentage}%
            </span>
            <span className="text-xs sm:text-sm text-[#FFF4E3]/75 mt-1 font-medium">
              Porcentaje de acierto
            </span>
          </div>

          {/* Errors count */}
          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#380512]/80 border border-[#FFD166]/30 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-black font-cinematic text-red-400">
              {totalQuestions - correctCount}
            </span>
            <span className="text-xs sm:text-sm text-[#FFF4E3]/75 mt-1 font-medium">
              Errores cometidos
            </span>
          </div>
        </div>

        {/* Required Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRetryQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F47B20] to-[#FFD166] text-[#650D24] font-black text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/40 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 font-bold" />
            <span>Volver a intentarlo</span>
          </button>

          <button
            onClick={onWatchVideoAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#A61B2B] hover:bg-[#c22033] text-white font-bold text-sm sm:text-base border border-[#FFD166]/40 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/40 cursor-pointer"
          >
            <Film className="w-5 h-5" />
            <span>Ver el vídeo otra vez</span>
          </button>
        </div>
      </div>

      {/* Review of Errors and Answers */}
      <div className="bg-[#52091c]/90 rounded-3xl p-5 sm:p-8 border-2 border-[#FFD166]/30 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#FFD166]/20">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinematic text-[#FFD166]">
              Revisión de respuestas y errores
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF4E3]/80">
              Analiza cada pregunta con sus opciones, explicación en español y traducción al armenio.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#380512] border border-[#FFD166]/20 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#FFD166] text-[#650D24] shadow'
                  : 'text-[#FFF4E3]/70 hover:text-white'
              }`}
            >
              Todas ({totalQuestions})
            </button>
            <button
              onClick={() => setFilter('errors')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'errors'
                  ? 'bg-red-500 text-white shadow'
                  : 'text-[#FFF4E3]/70 hover:text-white'
              }`}
            >
              Fallos ({totalQuestions - correctCount})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'correct'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-[#FFF4E3]/70 hover:text-white'
              }`}
            >
              Aciertos ({correctCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="mt-6 space-y-4">
          {filteredQuestions.map((q) => {
            const userAns = userAnswers.find(a => a.questionId === q.id);
            const isCorrect = userAns?.isCorrect ?? false;
            const isExpanded = expandedQuestions.has(q.id);

            const chosenOption = q.options.find(o => o.id === userAns?.selectedOptionId);
            const correctOption = q.options.find(o => o.id === q.correctOptionId);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-[#3b0613]/70 border-emerald-500/40 hover:border-emerald-500'
                    : 'bg-[#400511]/90 border-red-500/50 hover:border-red-500 shadow-md'
                } p-4 sm:p-5`}
              >
                <div 
                  onClick={() => toggleDetails(q.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#FFF4E3] font-cinematic">
                        {q.id}. {q.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#FFD166] font-armenian mt-0.5">
                        {q.questionArmenian}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      isCorrect ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40' : 'bg-red-950 text-red-300 border border-red-600/40'
                    }`}>
                      {isCorrect ? 'Correcta' : 'Fallida'}
                    </span>
                    <button className="p-1 text-[#FFD166]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Always show compact summary, and expand on click */}
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/60">Tu respuesta:</span>
                    <span className={`font-bold font-armenian ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                      {userAns?.selectedOptionId}) {chosenOption?.text || 'Sin respuesta'}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/60">Respuesta correcta:</span>
                      <span className="font-bold text-emerald-400 font-armenian">
                        {q.correctOptionId}) {correctOption?.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded full details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#FFD166]/20 space-y-3 animate-fadeIn">
                    <div className="bg-[#29040e]/80 p-3.5 rounded-xl border border-[#FFD166]/20">
                      <p className="text-xs font-bold text-[#FFD166] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FFD166]" />
                        Explicación en español:
                      </p>
                      <p className="text-xs sm:text-sm text-[#FFF4E3] leading-relaxed">
                        {q.explanationEs}
                      </p>
                    </div>

                    <div className="bg-[#29040e]/80 p-3.5 rounded-xl border border-[#FFD166]/20">
                      <p className="text-xs font-bold text-[#FFD166] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Languages className="w-3 h-3 text-[#FFD166]" />
                        Հայերեն բացատրություն (Բացատրություն հայերենով):
                      </p>
                      <p className="text-xs sm:text-sm text-[#FFD166] font-armenian leading-relaxed">
                        {q.explanationHy}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
