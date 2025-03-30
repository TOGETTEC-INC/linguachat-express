
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Settings, MessageCircle, Globe, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const conversations = [
  { id: '1', name: 'Sarah Connor', lastMessage: 'Bonjour, comment ça va ?', timestamp: '10:30' },
  { id: '2', name: 'John Smith', lastMessage: 'Hello, how are you today?', timestamp: '09:15' },
  { id: '3', name: 'Maria Gonzalez', lastMessage: 'Hola, ¿cómo estás?', timestamp: 'Hier' },
  { id: '4', name: 'Hans Müller', lastMessage: 'Guten tag, wie geht es dir?', timestamp: 'Lun' },
  { id: '5', name: 'Li Wei', lastMessage: '你好，今天好吗？', timestamp: 'Mar' },
];

const ChatSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-chat-primary flex items-center gap-2">
          <Globe className="h-6 w-6" /> LinguaChat
        </h1>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une conversation..."
              className="pl-9 bg-muted/50"
            />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Conversations récentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((convo) => (
                <SidebarMenuItem key={convo.id}>
                  <SidebarMenuButton 
                    asChild
                    className={location.pathname === `/chat/${convo.id}` ? "bg-accent" : ""}
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => navigate(`/chat/${convo.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-chat-primary/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-chat-primary" />
                        </div>
                        <div className="flex-1 truncate">
                          <div className="flex justify-between">
                            <span className="font-medium">{convo.name}</span>
                            <span className="text-xs text-muted-foreground">{convo.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div 
                    className="cursor-pointer"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div 
                    className="cursor-pointer"
                    onClick={() => navigate('/new-chat')}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Nouvelle conversation</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
