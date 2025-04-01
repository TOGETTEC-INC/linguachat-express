
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings } from '@/types/chat';

interface AuthContextType {
  user: UserSettings | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (stocké dans localStorage)
    const storedUser = localStorage.getItem('linguachat_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Fonction de connexion avec Google (simulée)
  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simuler une connexion à l'API Google
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Créer un utilisateur factice pour simuler la connexion
      const newUser: UserSettings = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name: 'Utilisateur Google',
        preferredLanguage: 'fr',
        avatar: `https://ui-avatars.com/api/?name=Utilisateur+Google&background=random`
      };
      
      // Stocker l'utilisateur dans localStorage
      localStorage.setItem('linguachat_user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('linguachat_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

