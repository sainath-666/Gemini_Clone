
import React, { useState, useEffect } from 'react';
import { Chat } from "@google/genai";
import { createChat } from './src/services/geminiService';
import Sidebar from './src/components/Sidebar';
import ChatView from './src/components/ChatView';
import { ChatSession, Message, MessageSender } from './types';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [chatInstances, setChatInstances] = useState<Record<string, Chat>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    setActiveSessionId(null);
    if(window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleSelectChat = (id: string) => {
    setActiveSessionId(id);
    if(window.innerWidth < 768) setSidebarOpen(false);
  };
  
  const handleSendMessage = async (prompt: string, isNewChat: boolean) => {
    if (isLoading) return;
    setIsLoading(true);

    let currentSessionId = activeSessionId;
    let chat: Chat;

    const userMessage: Message = { id: `user-${Date.now()}`, text: prompt, sender: MessageSender.USER };

    if (isNewChat) {
      const newId = `session-${Date.now()}`;
      const newSession: ChatSession = { id: newId, title: "New Chat", messages: [userMessage] };
      chat = createChat();
      setSessions(prev => [newSession, ...prev]);
      setChatInstances(prev => ({...prev, [newId]: chat}));
      setActiveSessionId(newId);
      currentSessionId = newId;
    } else {
      if (!currentSessionId) {
        setIsLoading(false);
        return;
      }
      chat = chatInstances[currentSessionId] || createChat();
      if (!chatInstances[currentSessionId]) {
        setChatInstances(prev => ({...prev, [String(currentSessionId)]: chat}));
      }
      setSessions(prev => prev.map(s => s.id === currentSessionId ? {...s, messages: [...s.messages, userMessage]} : s));
    }
    
    if (!currentSessionId) {
        setIsLoading(false);
        return;
    }

    const aiMessageId = `ai-${Date.now()}`;
    try {
      const placeholder: Message = { id: aiMessageId, text: '', sender: MessageSender.AI };
      setSessions(prev => prev.map(s => s.id === currentSessionId ? {...s, messages: [...s.messages, placeholder]} : s));

      const stream = await chat.sendMessageStream({ message: prompt });
      let aiResponseText = '';
      let firstChunk = true;

      for await (const chunk of stream) {
        aiResponseText += chunk.text;
        
        let newTitle: string | undefined = undefined;
        if(isNewChat && firstChunk && prompt) {
          newTitle = prompt.substring(0, 30) + (prompt.length > 30 ? '...' : '');
          firstChunk = false;
        }

        setSessions(prev => prev.map(s => {
          if (s.id === currentSessionId) {
            const updatedMessages = s.messages.map(m => m.id === aiMessageId ? {...m, text: aiResponseText} : m);
            return {...s, messages: updatedMessages, title: newTitle ?? s.title };
          }
          return s;
        }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: aiMessageId,
        text: "Sorry, I encountered an error. Please try again.",
        sender: MessageSender.AI
      };
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          const updatedMessages = s.messages.map(m => m.id === aiMessageId ? errorMessage : m);
          return {...s, messages: updatedMessages };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const activeSession = sessions.find(s => s.id === activeSessionId) || null;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      <ChatView
        activeSession={activeSession}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
