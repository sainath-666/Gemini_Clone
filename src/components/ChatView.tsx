import React, { useRef, useEffect } from "react";
import { ChatSession } from "../../types";
import MessageComponent from "./Message";
import PromptInput from "./PromptInput";
import WelcomeView from "./WelcomeView";
import { GeminiIcon } from "./icons";

interface ChatViewProps {
  activeSession: ChatSession | null;
  onSendMessage: (
    prompt: string,
    file: File | null,
    isNewChat: boolean
  ) => void;
  isLoading: boolean;
}

const ChatView: React.FC<ChatViewProps> = ({
  activeSession,
  onSendMessage,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeSession?.messages.length) {
      scrollToBottom();
    }
  }, [activeSession?.messages, isLoading]);

  const handleSendPrompt = (prompt: string, file: File | null) => {
    onSendMessage(
      prompt,
      file,
      !activeSession || activeSession.messages.length === 0
    );
  };

  const handleWelcomePromptClick = (prompt: string) => {
    onSendMessage(prompt, null, true);
  };

  const hasMessages = activeSession && activeSession.messages.length > 0;

  return (
    <div className="flex flex-col h-full flex-1 bg-[#131314]">
      <div className="flex-1 overflow-y-auto">
        {hasMessages ? (
          <div className="max-w-4xl mx-auto px-4">
            {activeSession.messages.map((msg) => (
              <MessageComponent key={msg.id} message={msg} />
            ))}
            {isLoading &&
              activeSession.messages[activeSession.messages.length - 1]
                .sender === "user" && (
                <div className="flex items-start gap-4 py-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full">
                    <GeminiIcon className="h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-neutral-200 mb-1">
                      Gemini
                    </div>
                    <div className="text-neutral-200 text-base leading-relaxed flex items-center gap-2">
                      <span className="animate-pulse">●</span>
                      <span className="animate-pulse [animation-delay:0.2s]">
                        ●
                      </span>
                      <span className="animate-pulse [animation-delay:0.4s]">
                        ●
                      </span>
                    </div>
                  </div>
                </div>
              )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <WelcomeView onPromptClick={handleWelcomePromptClick} />
        )}
      </div>

      <div>
        <PromptInput onSend={handleSendPrompt} isLoading={isLoading} />
        <div className="w-full max-w-4xl mx-auto flex justify-center items-center text-xs text-neutral-500 pb-3 text-center px-4">
          <p>
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
