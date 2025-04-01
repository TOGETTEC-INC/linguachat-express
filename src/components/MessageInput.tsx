
import React, { useState } from 'react';
import { Send, Globe, Smile, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MessageInputProps {
  onSendMessage: (content: string, language: string) => void;
}

const languages = [
  { value: 'fr', label: 'Français 🇫🇷' },
  { value: 'en', label: 'English 🇬🇧' },
  { value: 'es', label: 'Español 🇪🇸' },
  { value: 'de', label: 'Deutsch 🇩🇪' },
  { value: 'it', label: 'Italiano 🇮🇹' },
  { value: 'pt', label: 'Português 🇵🇹' },
  { value: 'ru', label: 'Русский 🇷🇺' },
  { value: 'zh', label: '中文 🇨🇳' },
  { value: 'ja', label: '日本語 🇯🇵' },
  { value: 'ar', label: 'العربية 🇸🇦' },
];

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('fr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, language);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 bg-white flex items-end gap-2"
    >
      <div className="flex items-center gap-2">
        <button type="button" className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <Smile className="h-6 w-6" />
        </button>
        <button type="button" className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <Paperclip className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex-1 relative">
        <Textarea
          placeholder="Tapez un message..."
          className="resize-none min-h-[46px] max-h-32 rounded-full pl-4 pr-12 py-3 bg-gray-100 border-0 focus-visible:ring-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        <div className="absolute bottom-2 right-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-8 w-8 px-0 border-0 bg-transparent">
              <Globe className="h-5 w-5 text-chat-primary" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {message.trim() ? (
        <Button 
          type="submit" 
          size="icon" 
          className="rounded-full bg-chat-primary hover:bg-chat-secondary"
        >
          <Send className="h-5 w-5" />
        </Button>
      ) : (
        <Button 
          type="button" 
          size="icon" 
          className="rounded-full bg-chat-primary hover:bg-chat-secondary"
        >
          <Mic className="h-5 w-5" />
        </Button>
      )}
    </form>
  );
};

export default MessageInput;
