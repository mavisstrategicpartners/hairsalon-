'use client'

import { useEffect } from 'react'

function silence(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  if (video.volume !== 0) {
    video.volume = 0
  }
}

function silenceAll() {
  document.querySelectorAll('video').forEach((video) => silence(video))
}

/** Site-wide: every video stays muted, including after play or native unmute attempts. */
export function KeepVideosSilent() {
  useEffect(() => {
    silenceAll()
    const onCapture = (event: Event) => {
      const target = event.target
      if (target instanceof HTMLVideoElement) silence(target)
    }
    document.addEventListener('volumechange', onCapture, true)
    document.addEventListener('play', onCapture, true)
    document.addEventListener('playing', onCapture, true)
    const observer = new MutationObserver(silenceAll)
    observer.observe(document.body, { childList: true, subtree: true })
    const id = window.setInterval(silenceAll, 400)
    return () => {
      window.clearInterval(id)
      observer.disconnect()
      document.removeEventListener('volumechange', onCapture, true)
      document.removeEventListener('play', onCapture, true)
      document.removeEventListener('playing', onCapture, true)
    }
  }, [])

  return null
}
