
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import ChatLayout from '@/components/ChatLayout';
import MessageBox from '@/components/MessageBox';
import MessageInput from '@/components/MessageInput';
import useChat from '@/hooks/useChat';
import { Message } from '@/types/chat';

const ChatPage: React.FC = () => {
  const { id = '1' } = useParams<{ id: string }>();
  const [userLanguage, setUserLanguage] = useState('fr');
  
  const { messages, isLoading, sendMessage } = useChat({
    conversationId: id,
    userLanguage,
  });

  return (
    <ChatLayout>
      <div className="flex items-center justify-between bg-white p-4 border-b shadow-sm">
        <h2 className="text-lg font-semibold">Conversation</h2>
        <div className="text-sm text-muted-foreground">
          Langue de réception: Français
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          // Skeleton loader pendant le chargement
          <>
            <div className="flex max-w-[80%] mb-4">
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
            <div className="flex max-w-[80%] ml-auto mb-4">
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
            <div className="flex max-w-[80%] mb-4">
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </>
        ) : (
          // Affichage des messages
          messages.map((message: Message) => (
            <MessageBox
              key={message.id}
              content={message.content}
              originalContent={message.originalContent}
              isSent={message.isSent}
              timestamp={message.timestamp}
              language={message.language}
            />
          ))
        )}
      </div>
      
      <MessageInput onSendMessage={sendMessage} />
    </ChatLayout>
  );
};

export default ChatPage;
