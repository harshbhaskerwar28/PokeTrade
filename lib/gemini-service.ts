import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_SYSTEM_PROMPT, getRouteFromQuery } from "./website-context";
import { speechService } from "./speech-service";

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null;

export function initializeGemini(apiKey: string) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasNavigation?: boolean;
  navigationRoute?: string;
}

export interface VoiceSettings {
  language: string;
  rate: number;
  pitch: number;
  volume: number;
}

export class WebsiteAssistantService {
  private model: any;
  private chat: any;
  private speechSynthesis: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isClient = false;
  private voiceSettings: VoiceSettings = {
    language: "en-US",
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0
  };

  constructor() {
    // Only initialize speech features on client side
    if (typeof window !== 'undefined') {
      this.isClient = true;
      this.speechSynthesis = window.speechSynthesis;
      this.initializeSpeechSettings();
    }
  }

  async initialize(apiKey: string) {
    try {
      if (!genAI) {
        initializeGemini(apiKey);
      }
      
      if (!genAI) {
        throw new Error("Failed to initialize Gemini AI");
      }

      this.model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: GEMINI_SYSTEM_PROMPT
      });
      
      this.chat = this.model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      return true;
    } catch (error) {
      console.error("Failed to initialize Gemini:", error);
      return false;
    }
  }

  private initializeSpeechSettings() {
    if (!this.isClient) return;
    
    // Update speech service configuration with our settings
    speechService.updateConfig({
      language: this.voiceSettings.language,
      continuous: false,
      interimResults: true,
      maxAlternatives: 1
    });
  }

  async sendMessage(message: string): Promise<ChatMessage> {
    try {
      if (!this.chat) {
        throw new Error("Gemini chat not initialized");
      }

      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const responseText = response.text();

      // Check if response contains navigation instruction
      const navigationRoute = getRouteFromQuery(message);
      const hasNavigation = navigationRoute !== null;

      return {
        id: Date.now().toString(),
        type: "assistant",
        content: responseText,
        timestamp: new Date(),
        hasNavigation,
        navigationRoute: navigationRoute || undefined
      };
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      return {
        id: Date.now().toString(),
        type: "assistant", 
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      };
    }
  }

  // Voice Recognition Methods
  async startListening(): Promise<string> {
    if (!this.isClient) {
      throw new Error("Speech recognition not available on server side");
    }

    if (!speechService.isSupported()) {
      throw new Error("Speech recognition not supported in this browser");
    }

    try {
      // Check microphone permission first
      const permission = await speechService.checkMicrophonePermission();
      if (permission === 'denied') {
        throw new Error("Microphone access denied - please allow microphone permissions in your browser");
      }

      // Try to get microphone access
      if (permission === 'prompt') {
        const hasAccess = await speechService.requestMicrophoneAccess();
        if (!hasAccess) {
          throw new Error("Microphone access denied - please allow microphone permissions");
        }
      }

      // Start listening with the speech service
      const transcript = await speechService.startListening();
      return transcript;

    } catch (error) {
      // If primary speech recognition fails, we could try alternative methods here
      throw error;
    }
  }

  stopListening() {
    speechService.stopListening();
  }

  getIsListening(): boolean {
    return speechService.getIsListening();
  }

  // Text-to-Speech Methods
  async speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isClient || !this.speechSynthesis) {
        reject(new Error("Speech synthesis not supported or not available"));
        return;
      }

      // Stop any current speech
      this.stopSpeaking();

      this.currentUtterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance.lang = this.voiceSettings.language;
      this.currentUtterance.rate = this.voiceSettings.rate;
      this.currentUtterance.pitch = this.voiceSettings.pitch;
      this.currentUtterance.volume = this.voiceSettings.volume;

      this.currentUtterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      this.currentUtterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.speechSynthesis.speak(this.currentUtterance);
    });
  }

  stopSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking(): boolean {
    return this.speechSynthesis ? this.speechSynthesis.speaking : false;
  }

  // Voice Settings
  updateVoiceSettings(settings: Partial<VoiceSettings>) {
    this.voiceSettings = { ...this.voiceSettings, ...settings };
    
    // Update speech service configuration
    speechService.updateConfig({
      language: this.voiceSettings.language,
      continuous: false,
      interimResults: true,
      maxAlternatives: 1
    });
  }

  // Alternative speech recognition method for fallback
  async startListeningWithFallback(): Promise<string> {
    try {
      // Try primary speech recognition first
      return await this.startListening();
    } catch (primaryError) {
      console.warn("Primary speech recognition failed, trying alternative methods:", primaryError);
      
      // If primary fails due to network, try media recorder approach
      if (primaryError instanceof Error && primaryError.message.includes("Network")) {
        try {
          return await speechService.startMediaRecorderListening();
        } catch (fallbackError) {
          console.warn("Fallback speech recognition also failed:", fallbackError);
          throw new Error("All speech recognition methods failed. Please use text input.");
        }
      }
      
      throw primaryError;
    }
  }

  getVoiceSettings(): VoiceSettings {
    return { ...this.voiceSettings };
  }

  // Get available voices
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.speechSynthesis ? this.speechSynthesis.getVoices() : [];
  }

  // Navigation helper
  shouldNavigate(message: ChatMessage): boolean {
    return message.hasNavigation === true && !!message.navigationRoute;
  }

  getNavigationRoute(message: ChatMessage): string | null {
    return message.navigationRoute || null;
  }

  // Microphone access methods
  async checkMicrophonePermission(): Promise<PermissionState> {
    return speechService.checkMicrophonePermission();
  }

  async requestMicrophoneAccess(): Promise<boolean> {
    return speechService.requestMicrophoneAccess();
  }
}

// Export singleton instance
export const websiteAssistant = new WebsiteAssistantService(); 