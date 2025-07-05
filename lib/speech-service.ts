export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechConfig {
  language: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
}

export class SpeechService {
  private speechRecognition: any = null;
  private isListening = false;
  private isClient = false;
  private config: SpeechConfig = {
    language: "en-US",
    continuous: false,
    interimResults: true,
    maxAlternatives: 1
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.isClient = true;
      this.initializeSpeechRecognition();
    }
  }

  private initializeSpeechRecognition() {
    if (!this.isClient) return;

    // Check for different speech recognition APIs
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;

    if (SpeechRecognition) {
      try {
        this.speechRecognition = new SpeechRecognition();
        this.configureSpeechRecognition();
      } catch (error) {
        console.warn("Failed to initialize speech recognition:", error);
      }
    }
  }

  private configureSpeechRecognition() {
    if (!this.speechRecognition) return;

    this.speechRecognition.continuous = this.config.continuous;
    this.speechRecognition.interimResults = this.config.interimResults;
    this.speechRecognition.lang = this.config.language;
    this.speechRecognition.maxAlternatives = this.config.maxAlternatives;
  }

  public isSupported(): boolean {
    return this.isClient && !!this.speechRecognition;
  }

  public async startListening(): Promise<string> {
    if (!this.isSupported()) {
      throw new Error("Speech recognition not supported in this browser");
    }

    if (this.isListening) {
      throw new Error("Already listening");
    }

    return new Promise((resolve, reject) => {
      let finalTranscript = "";
      let timeoutId: NodeJS.Timeout;

      // Set timeout for speech recognition
      timeoutId = setTimeout(() => {
        this.stopListening();
        if (!finalTranscript.trim()) {
          reject(new Error("Speech recognition timeout - no speech detected"));
        }
      }, 10000); // 10 second timeout

      this.speechRecognition.onstart = () => {
        this.isListening = true;
        console.log("Speech recognition started");
      };

      this.speechRecognition.onresult = (event: any) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // If we have a final result, resolve immediately
        if (finalTranscript.trim()) {
          clearTimeout(timeoutId);
          this.stopListening();
          resolve(finalTranscript.trim());
        }
      };

      this.speechRecognition.onerror = (event: any) => {
        clearTimeout(timeoutId);
        this.isListening = false;
        
        let errorMessage = "Speech recognition failed";
        
        switch (event.error) {
          case "network":
            errorMessage = "Network error - check your internet connection";
            break;
          case "not-allowed":
            errorMessage = "Microphone access denied - please allow microphone permissions";
            break;
          case "no-speech":
            errorMessage = "No speech detected - please speak into your microphone";
            break;
          case "audio-capture":
            errorMessage = "Microphone not available - check your audio devices";
            break;
          case "aborted":
            errorMessage = "Speech recognition was aborted";
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        reject(new Error(errorMessage));
      };

      this.speechRecognition.onend = () => {
        this.isListening = false;
        
        // If we ended without a final result, try to use any partial result
        if (finalTranscript.trim()) {
          clearTimeout(timeoutId);
          resolve(finalTranscript.trim());
        }
      };

      try {
        this.speechRecognition.start();
      } catch (error) {
        clearTimeout(timeoutId);
        this.isListening = false;
        reject(new Error("Failed to start speech recognition"));
      }
    });
  }

  public stopListening() {
    if (this.speechRecognition && this.isListening) {
      try {
        this.speechRecognition.stop();
      } catch (error) {
        console.warn("Error stopping speech recognition:", error);
      }
      this.isListening = false;
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public updateConfig(newConfig: Partial<SpeechConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.configureSpeechRecognition();
  }

  // Alternative: Use Web Speech API with MediaRecorder fallback
  public async startMediaRecorderListening(): Promise<string> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Media recording not supported");
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      return new Promise((resolve, reject) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          
          // Here you would typically send to a speech-to-text service
          // For now, we'll return a placeholder
          stream.getTracks().forEach(track => track.stop());
          resolve("Media recorder transcript placeholder");
        };
        
        mediaRecorder.onerror = (event) => {
          stream.getTracks().forEach(track => track.stop());
          reject(new Error("Media recording failed"));
        };
        
        mediaRecorder.start();
        
        // Auto-stop after 5 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 5000);
      });
      
    } catch (error) {
      throw new Error("Failed to access microphone");
    }
  }

  // Method to check microphone permissions
  public async checkMicrophonePermission(): Promise<PermissionState> {
    if (!navigator.permissions) {
      return "prompt"; // Default assumption
    }

    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return permission.state;
    } catch (error) {
      return "prompt";
    }
  }

  // Method to request microphone access
  public async requestMicrophoneAccess(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const speechService = new SpeechService(); 