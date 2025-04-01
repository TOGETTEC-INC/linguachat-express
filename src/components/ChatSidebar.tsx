
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Settings, MessageCircle, Plus, MoreVertical, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const conversations = [
  { id: '1', name: 'Sarah Connor', lastMessage: 'Bonjour, comment ça va ?', timestamp: '10:30', avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=random' },
  { id: '2', name: 'John Smith', lastMessage: 'Hello, how are you today?', timestamp: '09:15', avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random' },
  { id: '3', name: 'Maria Gonzalez', lastMessage: 'Hola, ¿cómo estás?', timestamp: 'Hier', avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=random' },
  { id: '4', name: 'Hans Müller', lastMessage: 'Guten tag, wie geht es dir?', timestamp: 'Lun', avatar: 'https://ui-avatars.com/api/?name=Hans+Muller&background=random' },
  { id: '5', name: 'Li Wei', lastMessage: '你好，今天好吗？', timestamp: 'Mar', avatar: 'https://ui-avatars.com/api/?name=Li+Wei&background=random' },
];

const ChatSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="bg-chat-secondary p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-chat-primary text-white">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-medium text-white">LinguaChat</h1>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full text-white hover:bg-white/10">
            <MoreVertical className="h-5 w-5" />
          </button>
          <SidebarTrigger className="text-white" />
        </div>
      </SidebarHeader>
      <SidebarContent className="pb-0 h-full">
        <div className="px-3 py-2 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une conversation..."
              className="pl-9 bg-gray-100 border-0 rounded-full"
            />
          </div>
        </div>

        <SidebarGroup className="h-[calc(100vh-130px)] overflow-y-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((convo) => (
                <SidebarMenuItem key={convo.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`py-3 hover:bg-gray-100 ${location.pathname === `/chat/${convo.id}` ? "bg-gray-100" : ""}`}
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => navigate(`/chat/${convo.id}`)}
                    >
                      <div className="flex items-center gap-3 px-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={convo.avatar} alt={convo.name} />
                          <AvatarFallback className="bg-chat-primary text-white">
                            {convo.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 border-b border-gray-100 pb-3">
                          <div className="flex justify-between items-center">
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

        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => navigate('/new-chat')}
            className="bg-chat-primary hover:bg-chat-secondary text-white rounded-full p-3 shadow-lg transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
