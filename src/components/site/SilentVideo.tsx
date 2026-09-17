'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type SilentVideoProps = {
  src: string
  className?: string
  'aria-label'?: string
}

type WebkitVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void
  webkitExitFullscreen?: () => void
  webkitDisplayingFullscreen?: boolean
}

function silence(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  if (video.volume !== 0) {
    video.volume = 0
  }
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function SilentVideo({ src, className, 'aria-label': ariaLabel }: SilentVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const keepSilent = useCallback(() => {
    const video = videoRef.current
    if (video) silence(video)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    silence(video)

    const onPlay = () => {
      silence(video)
      setPlaying(true)
    }
    const onPause = () => setPlaying(false)
    const onTime = () => setCurrent(video.currentTime)
    const onMeta = () => setDuration(Number.isFinite(video.duration) ? video.duration : 0)
    const onEnded = () => {
      setPlaying(false)
      setCurrent(0)
    }

    video.addEventListener('volumechange', keepSilent)
    video.addEventListener('play', onPlay)
    video.addEventListener('playing', keepSilent)
    video.addEventListener('pause', onPause)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('ended', onEnded)

    const id = window.setInterval(keepSilent, 300)

    return () => {
      window.clearInterval(id)
      video.removeEventListener('volumechange', keepSilent)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('playing', keepSilent)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('ended', onEnded)
    }
  }, [keepSilent, src])

  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current as WebkitVideo | null
    const sync = () => {
      const native = Boolean(document.fullscreenElement === wrap)
      const ios = Boolean(video?.webkitDisplayingFullscreen)
      setFullscreen(native || ios)
    }
    document.addEventListener('fullscreenchange', sync)
    video?.addEventListener('webkitbeginfullscreen', sync)
    video?.addEventListener('webkitendfullscreen', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      video?.removeEventListener('webkitbeginfullscreen', sync)
      video?.removeEventListener('webkitendfullscreen', sync)
    }
  }, [])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) return
    silence(video)
    if (video.paused) {
      try {
        await video.play()
      } catch {
        setPlaying(false)
      }
    } else {
      video.pause()
    }
  }

  const seek = (value: string) => {
    const video = videoRef.current
    if (!video) return
    const next = Number(value)
    if (!Number.isFinite(next)) return
    video.currentTime = next
    setCurrent(next)
  }

  const toggleFullscreen = async () => {
    const wrap = wrapRef.current
    const video = videoRef.current as WebkitVideo | null
    if (!wrap || !video) return
    silence(video)

    if (document.fullscreenElement === wrap) {
      await document.exitFullscreen?.()
      return
    }
    if (video.webkitDisplayingFullscreen && video.webkitExitFullscreen) {
      video.webkitExitFullscreen()
      return
    }
    if (wrap.requestFullscreen) {
      try {
        await wrap.requestFullscreen()
        return
      } catch {
        /* iOS often rejects element fullscreen; fall through to the video API. */
      }
    }
    video.webkitEnterFullscreen?.()
  }

  return (
    <div ref={wrapRef} className="group/video relative h-full w-full min-w-0 overflow-hidden bg-[#1a1208]">
      <video
        ref={videoRef}
        src={src}
        className={className}
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label={ariaLabel}
        onVolumeChange={keepSilent}
        onPlay={keepSilent}
        onClick={togglePlay}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-100 transition-opacity duration-300 group-hover/video:opacity-100 md:opacity-0 md:group-hover/video:opacity-100 md:group-focus-within/video:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex min-w-0 items-center gap-2 px-2 py-2 sm:px-3">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={duration > 0 ? duration : 1}
          step={0.1}
          value={Math.min(current, duration > 0 ? duration : 1)}
          onChange={(event) => seek(event.target.value)}
          className="min-w-0 flex-1 accent-white"
          aria-label="Video timeline"
        />
        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-wider text-white/80 sm:inline">
          {formatTime(current)}
        </span>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white"
          aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {fullscreen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 9H4V4M15 9h5V4M15 15h5v5M9 15H4v5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
