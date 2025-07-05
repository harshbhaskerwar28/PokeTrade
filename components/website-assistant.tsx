"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  Settings
} from "lucide-react"
import { websiteAssistant, type ChatMessage } from "@/lib/gemini-service"
import { VoicePopup, VoiceIndicator } from "./voice-indicator"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

export function WebsiteAssistant() {
  const { isDark } = useTheme()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "👋 Hi! I'm your PokéTrade website assistant. I can help you navigate the platform, explain features, and answer questions about PokéTrade Market. Try asking me to show you your portfolio or open the market page!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Voice-related state
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentTranscription, setCurrentTranscription] = useState("")
  const [voicePopupOpen, setVoicePopupOpen] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [microphoneStatus, setMicrophoneStatus] = useState<"unknown" | "granted" | "denied" | "prompt">("unknown")
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize Gemini on first open
  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeAssistant()
    }
  }, [isOpen, isInitialized])

  const initializeAssistant = async () => {
    try {
      if (!geminiApiKey) {
        addSystemMessage("⚠️ Gemini API key not configured. Using basic navigation mode. To enable AI features, add NEXT_PUBLIC_GEMINI_API_KEY to your environment.")
        return
      }

      const success = await websiteAssistant.initialize(geminiApiKey)
      if (success) {
        setIsInitialized(true)
        addSystemMessage("🤖 AI assistant is now ready! I can help with advanced questions and navigation.")
      } else {
        addSystemMessage("Sorry, I'm having trouble connecting to my AI service. You can still use the basic navigation features.")
      }
    } catch (error) {
      console.error("Failed to initialize assistant:", error)
      addSystemMessage("I'm currently in basic mode. I can still help with navigation, but AI features are unavailable.")
    }
  }

  const addSystemMessage = (content: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "assistant",
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, systemMessage])
  }

  const handleSendMessage = async (message: string, fromVoice = false) => {
    if (!message.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user", 
      content: message,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setCurrentTranscription("")
    setIsTyping(true)

    try {
      let response: ChatMessage
      
      if (isInitialized) {
        response = await websiteAssistant.sendMessage(message)
      } else {
        // Fallback responses for basic navigation
        response = generateFallbackResponse(message)
      }

      setMessages(prev => [...prev, response])

      // Handle navigation if needed
      if (websiteAssistant.shouldNavigate(response)) {
        const route = websiteAssistant.getNavigationRoute(response)
        if (route) {
          setTimeout(() => {
            router.push(route)
          }, 1000) // Small delay to show the response first
        }
      }

      // Speak response if voice mode is enabled and speech is enabled
      if (fromVoice && speechEnabled && response.content) {
        try {
          setIsSpeaking(true)
          await websiteAssistant.speak(response.content)
        } catch (error) {
          console.error("Speech synthesis error:", error)
          const errorMessage = error instanceof Error ? error.message : "Unknown error"
          
          if (errorMessage.includes("not supported") || errorMessage.includes("not available")) {
            // Silently disable speech if not supported
            setSpeechEnabled(false)
          }
        } finally {
          setIsSpeaking(false)
        }
      }

    } catch (error) {
      console.error("Error sending message:", error)
      addSystemMessage("I'm sorry, I encountered an error. Please try again.")
    } finally {
      setIsTyping(false)
    }
  }

  const generateFallbackResponse = (message: string): ChatMessage => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes("portfolio")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: "I'll take you to your portfolio where you can view your card holdings and performance metrics.",
        timestamp: new Date(),
        hasNavigation: true,
        navigationRoute: "/portfolio"
      }
    } else if (lowerMessage.includes("market") || lowerMessage.includes("chart")) {
      return {
        id: Date.now().toString(), 
        type: "assistant",
        content: "Let me show you the market page with live charts and trading data.",
        timestamp: new Date(),
        hasNavigation: true,
        navigationRoute: "/market"
      }

    } else if (lowerMessage.includes("dashboard")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content: "Taking you to your dashboard for an overview of your trading activity and performance.",
        timestamp: new Date(),
        hasNavigation: true,
        navigationRoute: "/dashboard"
      }
          } else {
        return {
          id: Date.now().toString(),
          type: "assistant",
          content: "I can help you navigate PokéTrade Market! Try asking me to show you your portfolio, market data, or dashboard. You can also ask about specific features of the platform.",
          timestamp: new Date()
        }
      }
  }

  const toggleVoiceMode = async () => {
    if (!isVoiceMode) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach(track => track.stop())
        setMicrophoneStatus("granted")
        setIsVoiceMode(true)
        setVoicePopupOpen(true)
        startListening()
      } catch (error) {
        console.error("Microphone access denied:", error)
        setMicrophoneStatus("denied")
        addSystemMessage("🎤 Microphone access is required for voice input. Please enable microphone permissions and try again.")
      }
    } else {
      setIsVoiceMode(false)
      setVoicePopupOpen(false)
      stopListening()
    }
  }

  const startListening = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      addSystemMessage("🎤 Voice input is not supported in this browser. Please try Chrome or Edge.")
      return
    }

    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        setCurrentTranscription("")
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')
        
        setCurrentTranscription(transcript)
        
        if (event.results[event.results.length - 1].isFinal) {
          handleSendMessage(transcript, true)
          setIsListening(false)
          setCurrentTranscription("")
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        setCurrentTranscription("")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      console.error("Failed to start voice recognition:", error)
      addSystemMessage("Voice input failed to start. Please try again.")
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled)
    if (isSpeaking) {
      websiteAssistant.stopSpeaking()
      setIsSpeaking(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-2xl hover:shadow-blue-500/25 z-50 transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Voice Popup */}
      <VoicePopup
        isOpen={voicePopupOpen}
        isListening={isListening}
        isSpeaking={isSpeaking}
        transcription={currentTranscription}
        microphoneStatus={microphoneStatus}
        onClose={() => {
          setVoicePopupOpen(false)
          setIsVoiceMode(false)
          stopListening()
        }}
      />

      <Card
        className={cn(
          "backdrop-blur-md border shadow-2xl rounded-2xl transition-all duration-300",
          isDark 
            ? "bg-white/10 border-white/20"
            : "bg-black/10 border-black/20",
          isMinimized ? "w-72 sm:w-80 h-16" : "w-72 sm:w-80 lg:w-96 h-[400px] sm:h-[500px]"
        )}
      >
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between p-3",
            !isMinimized && (isDark ? "border-b border-white/20" : "border-b border-black/20")
          )}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30">
              <Bot className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <CardTitle className={`text-sm ${
                isDark ? "text-white" : "text-slate-900"
              }`}>Website Assistant</CardTitle>
              <div className="flex items-center gap-1">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  isInitialized ? "bg-green-400" : "bg-yellow-400"
                )} />
                <span className={`text-xs ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {isInitialized ? "AI Ready" : "Connecting..."}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Voice indicator when active */}
            {(isListening || isSpeaking) && (
              <VoiceIndicator 
                isListening={isListening}
                isSpeaking={isSpeaking}
                className="mr-2"
              />
            )}
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className={`h-6 w-6 p-0 hover:bg-white/10 ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className={`h-6 w-6 p-0 hover:bg-white/10 ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-[280px] sm:h-[360px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`flex items-start gap-2 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={cn(
                            "p-1.5 rounded-lg backdrop-blur-sm flex-shrink-0",
                            message.type === "user" 
                              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30" 
                              : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30"
                          )}
                        >
                          {message.type === "user" ? (
                            <User className="h-3 w-3 text-blue-400" />
                          ) : (
                            <Bot className="h-3 w-3 text-purple-400" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "p-2.5 rounded-lg backdrop-blur-sm min-w-0",
                            message.type === "user" 
                              ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-100" 
                              : isDark
                                ? "bg-white/10 border border-white/20 text-white"
                                : "bg-black/10 border border-black/20 text-slate-900"
                          )}
                        >
                          <p className={`text-xs leading-relaxed whitespace-pre-line break-words ${
                            message.type === "assistant" && !isDark ? "text-slate-900" : ""
                          }`}>{message.content}</p>
                          <div className={`text-xs opacity-60 mt-1 ${
                            message.type === "assistant" && !isDark ? "text-slate-700" : ""
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                          
                          {/* Navigation indicator */}
                          {message.hasNavigation && (
                            <div className="mt-2">
                              <Badge className="bg-green-500/20 text-green-400 border border-green-400/30 text-xs">
                                🧭 Navigating...
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
                        <Bot className="h-3 w-3 text-purple-400" />
                      </div>
                      <div className={`backdrop-blur-sm p-2 rounded-lg border ${
                        isDark 
                          ? "bg-white/10 border-white/20"
                          : "bg-black/10 border-black/20"
                      }`}>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input Area */}
            <div className={`p-4 border-t ${
              isDark ? "border-white/20" : "border-black/20"
            }`}>
              <div className="flex items-center gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  placeholder="Ask me about PokéTrade features or navigation..."
                  className={`flex-1 backdrop-blur-sm rounded-lg text-sm h-8 border ${
                    isDark 
                      ? "bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/15"
                      : "bg-black/10 border-black/20 text-slate-900 placeholder:text-slate-500 focus:bg-black/15"
                  }`}
                  disabled={isListening}
                />
                
                {/* Voice Controls */}
                <Button
                  onClick={speechEnabled ? toggleSpeech : () => setSpeechEnabled(true)}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 transition-all",
                    speechEnabled 
                      ? "text-green-400 hover:text-green-300" 
                      : "text-gray-400 hover:text-gray-300"
                  )}
                  title={speechEnabled ? "Disable speech" : "Enable speech"}
                >
                  {speechEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                </Button>

                <Button
                  onClick={isListening ? stopListening : (isVoiceMode ? startListening : toggleVoiceMode)}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0 transition-all",
                    isVoiceMode || isListening
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : isDark
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-black/10 hover:bg-black/20 text-slate-900"
                  )}
                  title={isListening ? "Stop listening" : "Voice input"}
                >
                  {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                </Button>

                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping || isListening}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 h-8 w-8 p-0"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
} 