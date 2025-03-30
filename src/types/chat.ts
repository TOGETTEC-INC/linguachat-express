
export interface Message {
  id: string;
  content: string;
  originalContent?: string;
  isSent: boolean;
  timestamp: string;
  language: string;
  translatedFromLanguage?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessageTime: string;
}

export interface UserSettings {
  id: string;
  name: string;
  preferredLanguage: string;
  avatar?: string;
}
