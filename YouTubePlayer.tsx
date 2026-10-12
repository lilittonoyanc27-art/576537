import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Play, Pause, ExternalLink, RotateCcw, Volume2, Film } from 'lucide-react';
import { YOUTUBE_VIDEO_ID, YOUTUBE_VIDEO_URL } from './data';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface YouTubePlayerRef {
  seekTo: (seconds: number) => void;
  play: () => void;
  pause: () => void;
  getCurrentTime: () => number;
}

interface YouTubePlayerProps {
  onTimeUpdate?: (currentTime: number) => void;
  onVideoEnd?: () => void;
}

export const YouTubePlayer = forwardRef<YouTubePlayerRef, YouTubePlayerProps>(({
  onTimeUpdate,
  onVideoEnd
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(145);
  const [hasError, setHasError] = useState(false);

  // Expose player methods to parent component
  useImperativeHandle(ref, () => ({
    seekTo: (seconds: number) => {
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        try {
          playerRef.current.seekTo(seconds, true);
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch (e) {
          console.warn('Error seeking in YouTube player:', e);
        }
      }
      setCurrentTime(seconds);
    },
    play: () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      }
    },
    pause: () => {
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
    },
    getCurrentTime: () => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        return playerRef.current.getCurrentTime();
      }
      return currentTime;
    }
  }));

  // Setup YouTube iframe API
  useEffect(() => {
    let isMounted = true;

    const loadPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const elementId = 'zorro-yt-player';
      if (!document.getElementById(elementId)) return;

      try {
        playerRef.current = new window.YT.Player(elementId, {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              setIsReady(true);
              try {
                const dur = event.target.getDuration();
                if (dur) setDuration(dur);
              } catch (_) {}
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
              }
              if (event.data === 0 && onVideoEnd) {
                onVideoEnd();
              }
            },
            onError: (err: any) => {
              console.warn('YouTube Player error:', err);
              // In case YouTube restricts embedding in certain frames, flag error for fallback
              if (err.data === 101 || err.data === 150 || err.data === 2) {
                setHasError(true);
              }
            }
          }
        });
      } catch (err) {
        console.warn('Failed to initialize YouTube player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      loadPlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (isMounted) loadPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (_) {}
      }
    };
  }, [onVideoEnd]);

  // Periodic time polling for subtitle synchronization
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const t = playerRef.current.getCurrentTime();
          if (typeof t === 'number' && !isNaN(t)) {
            setCurrentTime(t);
            if (onTimeUpdate) {
              onTimeUpdate(t);
            }
          }
        } catch (_) {}
      }
    }, 250);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const restartVideo = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#650D24] to-[#420716] border-2 border-[#FFD166]/40 shadow-2xl shadow-[#650D24]/50">
      {/* Cinematic Header Bar */}
      <div className="px-4 py-3 bg-[#650D24]/90 border-b border-[#FFD166]/20 flex items-center justify-between text-[#FFF4E3]">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-[#FFD166] animate-pulse" />
          <span className="font-cinematic font-bold tracking-wider text-sm sm:text-base text-[#FFD166]">
            La Máscara del Zorro (1998)
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-xs bg-[#A61B2B]/60 text-[#FFF4E3] rounded-full border border-[#FFD166]/30">
            Escena en español
          </span>
        </div>

        <a
          href={YOUTUBE_VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[#FFD166] hover:text-white transition-colors bg-[#A61B2B]/80 hover:bg-[#F47B20] px-2.5 py-1 rounded-lg border border-[#FFD166]/30"
          title="Abrir en YouTube"
        >
          <span>Abrir en YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Video Container (16:9 ratio) */}
      <div className="relative w-full aspect-video bg-black/95">
        <div id="zorro-yt-player" className="w-full h-full" ref={containerRef}></div>

        {/* Fallback overlay if YouTube blocks embedding */}
        {hasError && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#650D24] via-[#420716]/95 to-black flex flex-col items-center justify-center p-6 text-center z-20">
            <div className="w-16 h-16 rounded-full bg-[#A61B2B] flex items-center justify-center mb-4 border-2 border-[#FFD166] shadow-lg shadow-[#F47B20]/40">
              <Film className="w-8 h-8 text-[#FFD166]" />
            </div>
            <h3 className="text-xl font-bold font-cinematic text-[#FFD166] mb-2">
              Vídeo de El Zorro
            </h3>
            <p className="text-sm text-[#FFF4E3]/90 max-w-md mb-5 leading-relaxed">
              Si el reproductor de YouTube tiene restricciones en tu navegador, puedes abrir el vídeo oficial en una nueva pestaña y continuar con los subtítulos y el cuestionario interactivo aquí.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={YOUTUBE_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F47B20] to-[#A61B2B] text-white font-semibold text-sm hover:from-[#FFD166] hover:to-[#F47B20] hover:text-[#650D24] transition-all shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir vídeo en YouTube</span>
              </a>
              <button
                onClick={() => setHasError(false)}
                className="px-4 py-2 rounded-full border border-[#FFD166]/50 text-xs text-[#FFD166] hover:bg-[#FFD166]/10 transition-colors"
              >
                Reintentar reproductor
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Controller Bar */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-[#650D24] via-[#7d1230] to-[#650D24] flex items-center justify-between border-t border-[#FFD166]/20">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#F47B20] hover:bg-[#FFD166] text-[#650D24] flex items-center justify-center font-bold shadow-md hover:scale-105 transition-all"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={restartVideo}
            className="p-2 rounded-full bg-[#A61B2B]/60 hover:bg-[#A61B2B] text-[#FFF4E3] transition-colors"
            title="Reiniciar vídeo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="text-xs sm:text-sm font-mono text-[#FFD166] font-medium">
            {formatSeconds(currentTime)} / {formatSeconds(duration)}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#FFF4E3]/80">
          <span className="hidden md:inline">Sincronización activa con los subtítulos</span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
});

YouTubePlayer.displayName = 'YouTubePlayer';
