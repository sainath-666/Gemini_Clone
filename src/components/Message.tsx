import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message, MessageSender } from '../../types';
import { UserIcon, GeminiIcon, PdfIcon } from "./icons";

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isAi = message.sender === MessageSender.AI;

  const contentClassName = `text-neutral-200 text-base leading-relaxed ${
    isUser ? "text-right" : "text-left"
  } ${isAi ? "markdown-content" : "whitespace-pre-wrap"}`;

  return (
    <div
      className={`flex items-start gap-4 py-6 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-600" : "bg-transparent"
        }`}
      >
        {isUser ? (
          <UserIcon className="w-6 h-6 text-white" />
        ) : (
          <GeminiIcon className="h-4" />
        )}
      </div>
      <div className="flex-grow">
        <div
          className={`font-bold text-neutral-200 mb-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {isUser ? "You" : "Gemini"}
        </div>

        {isUser && message.filePreview && message.fileType && (
          <div
            className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {message.fileType.startsWith("image/") ? (
              <img
                src={message.filePreview}
                alt="User upload"
                className="max-w-xs max-h-64 rounded-xl border border-neutral-700"
              />
            ) : (
              <a
                href={message.filePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 transition-colors max-w-xs"
              >
                <PdfIcon className="w-8 h-8 text-red-500 flex-shrink-0" />
                <span
                  className="text-neutral-200 font-medium truncate"
                  title={message.fileName}
                >
                  {message.fileName}
                </span>
              </a>
            )}
          </div>
        )}

        <div className={contentClassName}>
          {isAi ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          ) : (
            message.text
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
