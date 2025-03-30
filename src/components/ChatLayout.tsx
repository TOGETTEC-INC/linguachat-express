
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatSidebar from './ChatSidebar';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <ChatSidebar />
        <main className="flex-1 flex flex-col h-screen">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChatLayout;
