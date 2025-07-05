"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface VoiceIndicatorProps {
  isListening: boolean
  isSpeaking: boolean
  className?: string
}

export function VoiceIndicator({ isListening, isSpeaking, className }: VoiceIndicatorProps) {
  const [audioLevel, setAudioLevel] = useState(0)
  
  // Simulate audio level animation when listening
  useEffect(() => {
    if (!isListening && !isSpeaking) return

    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100)
    }, 100)

    return () => clearInterval(interval)
  }, [isListening, isSpeaking])

  if (!isListening && !isSpeaking) return null

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {/* Voice Wave Animation */}
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Center dot */}
        <div 
          className={cn(
            "absolute w-3 h-3 rounded-full transition-all duration-200",
            isListening ? "bg-blue-400 animate-pulse" : "bg-green-400"
          )}
        />
        
        {/* Animated rings */}
        {[1, 2, 3, 4].map((ring) => (
          <div
            key={ring}
            className={cn(
              "absolute rounded-full border-2 transition-all duration-300",
              isListening 
                ? "border-blue-400/30 animate-ping" 
                : "border-green-400/30 animate-pulse"
            )}
            style={{
              width: `${12 + ring * 8}px`,
              height: `${12 + ring * 8}px`,
              animationDelay: `${ring * 0.2}s`,
              animationDuration: "2s"
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface VoiceWaveProps {
  isActive: boolean
  audioLevel?: number
  bars?: number
  className?: string
}

export function VoiceWave({ isActive, audioLevel = 50, bars = 5, className }: VoiceWaveProps) {
  const generateBars = () => {
    return Array.from({ length: bars }, (_, index) => {
      const baseHeight = 8
      const maxHeight = 32
      const randomMultiplier = isActive ? Math.random() * 0.7 + 0.3 : 0.2
      const height = baseHeight + (maxHeight - baseHeight) * (audioLevel / 100) * randomMultiplier
      
      return (
        <div
          key={index}
          className={cn(
            "bg-gradient-to-t from-purple-500 to-blue-400 rounded-full transition-all duration-150",
            isActive ? "opacity-100" : "opacity-30"
          )}
          style={{
            width: "4px",
            height: `${height}px`,
            animationDelay: `${index * 0.1}s`
          }}
        />
      )
    })
  }

  return (
    <div className={cn("flex items-end justify-center gap-1 h-8", className)}>
      {generateBars()}
    </div>
  )
}

interface VoicePopupProps {
  isOpen: boolean
  isListening: boolean
  isSpeaking: boolean
  transcription?: string
  microphoneStatus?: "unknown" | "granted" | "denied" | "prompt"
  onClose: () => void
  className?: string
}

export function VoicePopup({ 
  isOpen, 
  isListening, 
  isSpeaking, 
  transcription, 
  microphoneStatus = "unknown",
  onClose,
  className 
}: VoicePopupProps) {
  if (!isOpen) return null

  return (
    <div className={cn(
      "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 max-w-sm",
      "bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl",
      "shadow-2xl animate-in slide-in-from-bottom-2 duration-300",
      className
    )}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isListening ? "bg-blue-400" : isSpeaking ? "bg-green-400" : "bg-gray-400"
            )} />
            <span className="text-white text-sm font-medium">
              {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Voice Mode"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Voice Visualization */}
        <div className="flex justify-center mb-4">
          {isListening || isSpeaking ? (
            <VoiceWave isActive={true} bars={7} />
          ) : (
            <div className="flex items-center justify-center w-16 h-8 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
          )}
        </div>

        {/* Transcription */}
        {transcription && (
          <div className="bg-white/10 rounded-lg p-3 mb-4">
            <p className="text-white text-sm">{transcription}</p>
          </div>
        )}

        {/* Status Text */}
        <div className="text-center">
          <p className="text-gray-300 text-xs">
            {microphoneStatus === "denied" 
              ? "Microphone access denied - check browser permissions"
              : microphoneStatus === "prompt" 
                ? "Please allow microphone access to continue"
                : isListening 
                  ? "Speak now..." 
                  : isSpeaking 
                    ? "Assistant is responding..." 
                    : "Tap the microphone to start"}
          </p>
        </div>
      </div>
    </div>
  )
} 