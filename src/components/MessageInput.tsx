
import React, { useState } from 'react';
import { Send, Globe } from 'lucide-react';
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
      className="border-t p-3 flex flex-col gap-2 bg-white"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue />
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
      <div className="flex gap-2">
        <Textarea
          placeholder="Écrivez votre message..."
          className="flex-1 min-h-20 max-h-40 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
