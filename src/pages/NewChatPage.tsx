
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Users, Search, Plus } from 'lucide-react';
import ChatLayout from '@/components/ChatLayout';

const contacts = [
  { id: '1', name: 'Sarah Connor', language: 'fr' },
  { id: '2', name: 'John Smith', language: 'en' },
  { id: '3', name: 'Maria Gonzalez', language: 'es' },
  { id: '4', name: 'Hans Müller', language: 'de' },
  { id: '5', name: 'Li Wei', language: 'zh' },
  { id: '6', name: 'Akira Tanaka', language: 'ja' },
  { id: '7', name: 'Elena Petrova', language: 'ru' },
];

const NewChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startNewChat = (contactId: string) => {
    // Dans une vraie application, nous créerions une nouvelle conversation
    // Pour l'instant, nous allons simplement naviguer vers une conversation existante
    navigate(`/chat/${contactId}`);
  };

  return (
    <ChatLayout>
      <div className="flex items-center bg-white p-4 border-b shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">Nouvelle conversation</h2>
      </div>
      
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un contact..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Users className="h-4 w-4" />
            Contacts
          </Label>
          
          {filteredContacts.length > 0 ? (
            <div className="space-y-2">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => startNewChat(contact.id)}
                >
                  <div className="w-10 h-10 rounded-full bg-chat-primary/20 flex items-center justify-center mr-3">
                    <span className="text-chat-primary font-semibold">
                      {contact.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Langue préférée: {contact.language.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucun contact trouvé</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setSearchTerm('')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un nouveau contact
              </Button>
            </div>
          )}
        </div>
      </div>
    </ChatLayout>
  );
};

export default NewChatPage;
