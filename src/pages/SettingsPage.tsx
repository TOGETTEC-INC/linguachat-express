
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ChatLayout from '@/components/ChatLayout';

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

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [preferredLanguage, setPreferredLanguage] = useState('fr');
  const [username, setUsername] = useState('Utilisateur');

  const handleSave = () => {
    // Dans une application réelle, nous enregistrerions ces paramètres dans un stockage persistant
    toast({
      title: "Paramètres enregistrés",
      description: "Vos préférences ont été mises à jour avec succès."
    });
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
        <h2 className="text-lg font-semibold">Paramètres</h2>
      </div>
      
      <div className="p-6 max-w-md mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Votre nom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Langue préférée</Label>
            <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
              <SelectTrigger id="language">
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
            <p className="text-sm text-muted-foreground">
              Les messages que vous recevrez seront traduits dans cette langue.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Options de notification</Label>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="sound" className="h-4 w-4" defaultChecked />
              <Label htmlFor="sound" className="text-sm font-normal">Son de notification</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="desktop" className="h-4 w-4" defaultChecked />
              <Label htmlFor="desktop" className="text-sm font-normal">Notifications sur le bureau</Label>
            </div>
          </div>
          
          <Button 
            className="w-full bg-chat-primary hover:bg-chat-primary/90"
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Enregistrer les préférences
          </Button>
        </div>
      </div>
    </ChatLayout>
  );
};

export default SettingsPage;
