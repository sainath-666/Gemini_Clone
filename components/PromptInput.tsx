
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './icons';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      <div className="relative flex items-end p-3 bg-[#1e1f20] rounded-2xl shadow-lg">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a prompt here"
          className="w-full bg-transparent text-neutral-200 placeholder-neutral-500 focus:outline-none resize-none overflow-y-hidden max-h-48"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className="ml-3 p-2 rounded-full bg-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-200 hover:bg-neutral-600 transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-200 rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;