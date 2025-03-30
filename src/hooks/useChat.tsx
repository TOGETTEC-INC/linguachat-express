
import { useState, useEffect } from 'react';
import { Message, Conversation } from '@/types/chat';
import { translateMessage, getLanguageName } from '@/services/translationService';
import { useToast } from '@/hooks/use-toast';

// Fonction utilitaire pour générer un ID unique
const generateId = () => Math.random().toString(36).substr(2, 9);

// Format de l'heure pour les messages
const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface UseChatProps {
  conversationId: string;
  userLanguage: string;
}

const useChat = ({ conversationId, userLanguage }: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Chargement initial des messages (simulé)
  useEffect(() => {
    setIsLoading(true);
    // Simulation d'un chargement asynchrone
    const timer = setTimeout(() => {
      // Messages prédéfinis pour la démo
      const initialMessages: Message[] = [
        {
          id: '1',
          content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
          isSent: false,
          timestamp: '10:30',
          language: 'Français',
        },
        {
          id: '2',
          content: 'Hello! I need information about translation.',
          originalContent: 'Hello! I need information about translation.',
          isSent: true,
          timestamp: '10:31',
          language: 'English',
          translatedFromLanguage: 'en',
        },
        {
          id: '3',
          content: 'Bien sûr, notre service de traduction prend en charge plus de 10 langues différentes.',
          isSent: false,
          timestamp: '10:32',
          language: 'Français',
        },
      ];
      setMessages(initialMessages);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [conversationId]);

  // Fonction pour envoyer un message
  const sendMessage = (content: string, language: string) => {
    const newMessage: Message = {
      id: generateId(),
      content,
      isSent: true,
      timestamp: formatTime(),
      language: getLanguageName(language),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulation de réponse automatique après un délai
    setTimeout(() => {
      // Traduire le message reçu dans la langue de l'utilisateur
      const translatedContent = translateMessage(content, language, userLanguage);
      
      const autoReply: Message = {
        id: generateId(),
        content: `Voici ma réponse à : "${translatedContent}"`,
        isSent: false,
        timestamp: formatTime(),
        language: getLanguageName(userLanguage),
      };
      
      setMessages((prev) => [...prev, autoReply]);
      
      toast({
        title: "Message reçu",
        description: "Un nouveau message a été traduit dans votre langue préférée."
      });
    }, 1500);
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};

export default useChat;
