
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, MessageCircle, Settings, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté de LinguaChat",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-chat-primary to-chat-secondary p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-chat-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
            <Globe className="h-10 w-10 text-chat-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">LinguaChat Express</h1>
          <p className="text-gray-600 mb-6">
            Communiquez sans barrières linguistiques. Messages traduits automatiquement dans votre langue préférée.
          </p>
          
          <div className="space-y-4">
            {user ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">{user.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">Langue: {user.preferredLanguage}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-chat-primary hover:bg-chat-primary/90"
                  onClick={() => navigate('/chat/1')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Commencer une conversation
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-chat-primary hover:bg-chat-primary/90"
                onClick={() => navigate('/login')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-muted/30 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Langues prises en charge</span>
            <span className="text-sm font-medium">10+</span>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">🇫🇷 FR</span>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">🇬🇧 EN</span>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">🇪🇸 ES</span>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">🇩🇪 DE</span>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">🇮🇹 IT</span>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">+5</span>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-white text-sm max-w-md text-center opacity-90">
        LinguaChat Express est une application de messagerie progressive qui traduit automatiquement les messages dans la langue de votre choix
      </p>
    </div>
  );
};

export default WelcomePage;
