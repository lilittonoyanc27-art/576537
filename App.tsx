/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './Navbar';
import { YouTubePlayer, YouTubePlayerRef } from './YouTubePlayer';
import { SubtitlesSection } from './SubtitlesSection';
import { QuizView } from './QuizView';
import { ResultsView } from './ResultsView';
import { VocabularyModal } from './VocabularyModal';
import { AppView, UserAnswer } from './types';
import { QUIZ_QUESTIONS } from './data';
import { Sparkles, Film, HelpCircle, CheckCircle, ExternalLink, BookOpen, Volume2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('video');
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isVocabOpen, setIsVocabOpen] = useState<boolean>(false);

  const playerRef = useRef<YouTubePlayerRef>(null);

  // Time update from YouTube player
  const handleTimeUpdate = (time: number) => {
    setVideoCurrentTime(time);
  };

  // Seek video from subtitles or glosario
  const handleSeekTo = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
    }
  };

  // Switch to quiz
  const handleStartQuiz = () => {
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete quiz
  const handleFinishQuiz = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restart quiz
  const handleRetryQuiz = () => {
    setUserAnswers([]);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go back to video lesson
  const handleBackToVideo = () => {
    setCurrentView('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col text-[#FFF4E3]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVocab={() => setIsVocabOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentView === 'video' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Header Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A61B2B]/70 border border-[#FFD166]/40 text-xs sm:text-sm font-semibold text-[#FFD166] mb-3 shadow-md">
                <Sparkles className="w-4 h-4 text-[#FFD166]" />
                <span>Lección Cinematográfica Bilingüe</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-cinematic text-white tracking-wide mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                El Zorro — Aprende español con el cine
              </h1>

              <p className="text-sm sm:text-base text-[#FFF4E3]/90 leading-relaxed font-medium">
                Mira el fragmento de <span className="text-[#FFD166] font-bold">La Máscara del Zorro</span> con Antonio Banderas.
                Escucha los diálogos en español, haz clic en las frases para revelar su traducción al armenio y completa la викторина para afianzar tu aprendizaje.
              </p>
            </div>

            {/* Video Player Card */}
            <div className="w-full max-w-4xl mx-auto">
              <YouTubePlayer
                ref={playerRef}
                onTimeUpdate={handleTimeUpdate}
                onVideoEnd={() => {
                  // Video finished prompt
                }}
              />
            </div>

            {/* Subtitles Section with synced playback and Armenian translations */}
            <div className="w-full max-w-4xl mx-auto">
              <SubtitlesSection
                currentTime={videoCurrentTime}
                onSeekTo={handleSeekTo}
                onStartQuiz={handleStartQuiz}
              />
            </div>
          </div>
        )}

        {currentView === 'quiz' && (
          <div className="animate-fadeIn">
            <QuizView
              onFinishQuiz={handleFinishQuiz}
              onBackToVideo={handleBackToVideo}
            />
          </div>
        )}

        {currentView === 'results' && (
          <div className="animate-fadeIn">
            <ResultsView
              userAnswers={userAnswers}
              onRetryQuiz={handleRetryQuiz}
              onWatchVideoAgain={handleBackToVideo}
            />
          </div>
        )}
      </main>

      {/* Vocabulary Modal */}
      <VocabularyModal
        isOpen={isVocabOpen}
        onClose={() => setIsVocabOpen(false)}
        onSelectTimestamp={(t) => {
          setCurrentView('video');
          handleSeekTo(t);
        }}
      />

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-[#FFD166]/20 bg-[#29040e]/90 text-center text-xs text-[#FFF4E3]/70">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-cinematic font-bold text-[#FFD166]">EL ZORRO</span>
            <span>—</span>
            <span>Aprende español con el cine</span>
          </div>
          <div className="text-[#FFD166]/80 font-armenian">
            Իսպաներենի ինտերակտիվ դասընթաց՝ հայերեն թարգմանությամբ
          </div>
        </div>
      </footer>
    </div>
  );
}
