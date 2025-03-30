
import React from 'react';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

interface MessageProps {
  content: string;
  originalContent?: string;
  isSent: boolean;
  timestamp: string;
  language: string;
}

const MessageBox: React.FC<MessageProps> = ({
  content,
  originalContent,
  isSent,
  timestamp,
  language,
}) => {
  return (
    <div
      className={cn(
        'group flex max-w-[80%] mb-3 animate-message-appear',
        isSent ? 'ml-auto' : 'mr-auto'
      )}
    >
      <div
        className={cn(
          'rounded-lg px-4 py-2 shadow-sm',
          isSent
            ? 'bg-chat-sent text-chat-dark rounded-tr-none'
            : 'bg-chat-received text-chat-dark rounded-tl-none'
        )}
      >
        <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
          <Globe className="h-3 w-3" />
          <span>{language}</span>
        </div>
        <p className="text-sm">{content}</p>
        {originalContent && (
          <div
            className="mt-1 pt-1 border-t border-gray-200 text-xs text-muted-foreground cursor-pointer"
            title="Message original"
          >
            <span className="italic">Original: {originalContent}</span>
          </div>
        )}
        <div className="mt-1 text-right">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
