
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import ChatLayout from '@/components/ChatLayout';
import MessageBox from '@/components/MessageBox';
import MessageInput from '@/components/MessageInput';
import useChat from '@/hooks/useChat';
import { Message } from '@/types/chat';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatPage: React.FC = () => {
  const { id = '1' } = useParams<{ id: string }>();
  const [userLanguage, setUserLanguage] = useState('fr');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, sendMessage } = useChat({
    conversationId: id,
    userLanguage,
  });

  // Get contact info based on conversation ID
  const contact = {
    id,
    name: ['Sarah Connor', 'John Smith', 'Maria Gonzalez', 'Hans Müller', 'Li Wei'][Number(id) - 1] || 'Contact',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(['Sarah Connor', 'John Smith', 'Maria Gonzalez', 'Hans Müller', 'Li Wei'][Number(id) - 1] || 'Contact')}&background=random`,
    status: 'En ligne'
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatLayout>
      <div className="flex items-center justify-between bg-chat-secondary p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-6 w-6 text-white cursor-pointer" onClick={() => window.history.back()} />
          <Avatar className="h-10 w-10 border border-white/20">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-md font-semibold text-white">{contact.name}</h2>
            <p className="text-xs text-white/70">{contact.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Phone className="h-5 w-5 cursor-pointer" />
          <Video className="h-5 w-5 cursor-pointer" />
          <MoreVertical className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-light_686b98c9fdffef3f.png')]"
        style={{ backgroundSize: '412.5px 749.25px' }}
      >
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
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={sendMessage} />
    </ChatLayout>
  );
};

export default ChatPage;
