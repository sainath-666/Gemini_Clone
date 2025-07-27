import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, MessageSender } from '../types';
import { UserIcon, GeminiIcon } from './icons';

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isAi = message.sender === MessageSender.AI;

  const contentClassName = `text-neutral-200 text-base leading-relaxed ${
    isUser ? 'text-right' : 'text-left'
  } ${isAi ? 'markdown-content' : 'whitespace-pre-wrap'}`;

  return (
    <div className={`flex items-start gap-4 py-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-transparent'}`}>
        {isUser ? <UserIcon className="w-6 h-6 text-white" /> : <GeminiIcon className="w-8 h-8" />}
      </div>
      <div className="flex-grow">
        <div className={`font-bold text-neutral-200 mb-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'You' : 'Gemini'}
        </div>
        <div className={contentClassName}>
          {isAi ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          ) : (
            message.text
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;