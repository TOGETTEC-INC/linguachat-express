
import React from 'react';
import { cn } from '@/lib/utils';
import { Globe, Check, CheckCheck, Clock } from 'lucide-react';

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
        'group flex max-w-[65%] mb-2 animate-message-appear',
        isSent ? 'ml-auto' : 'mr-auto'
      )}
    >
      <div
        className={cn(
          'relative rounded-lg px-3 py-2 shadow-sm',
          isSent 
            ? 'bg-chat-sent text-chat-dark rounded-tr-none' 
            : 'bg-chat-received text-chat-dark rounded-tl-none'
        )}
      >
        {/* Message tail */}
        <div 
          className={cn(
            "absolute top-0 w-4 h-4",
            isSent 
              ? "right-[-8px] bg-chat-sent" 
              : "left-[-8px] bg-chat-received"
          )}
          style={{
            clipPath: isSent 
              ? 'polygon(0 0, 0% 100%, 100% 0)' 
              : 'polygon(100% 0, 0 0, 100% 100%)'
          }}
        ></div>
        
        {language && (
          <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span>{language}</span>
          </div>
        )}
        
        <p className="text-sm break-words">{content}</p>
        
        {originalContent && (
          <div
            className="mt-1 pt-1 border-t border-gray-200 text-xs text-muted-foreground cursor-pointer"
            title="Message original"
          >
            <span className="italic">Original: {originalContent}</span>
          </div>
        )}
        
        <div className="flex items-center justify-end mt-1 gap-1">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {isSent && (
            <CheckCheck className="h-3 w-3 text-chat-accent" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
