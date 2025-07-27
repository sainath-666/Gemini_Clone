import React, { useState, useRef, useEffect } from "react";
import { SendIcon, PaperclipIcon, PdfIcon } from "./icons";

interface PromptInputProps {
  onSend: (prompt: string, file: File | null) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((inputValue.trim() || selectedFile) && !isLoading) {
      onSend(inputValue.trim(), selectedFile);
      setInputValue("");
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files like PDF, use a placeholder to trigger preview rendering
        setFilePreview("is_file");
      }
    }
    // Reset file input value to allow selecting the same file again
    if (e.target) {
      e.target.value = "";
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      <div className="bg-[#1e1f20] rounded-2xl shadow-lg">
        {filePreview && selectedFile && (
          <div className="p-3">
            <div className="relative w-fit">
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="max-h-40 rounded-lg"
                />
              ) : (
                <div className="flex items-center gap-3 p-2 rounded-lg bg-neutral-800 border border-neutral-700">
                  <PdfIcon className="w-8 h-8 text-red-500" />
                  <span className="text-neutral-200 text-sm font-medium">
                    {selectedFile.name}
                  </span>
                </div>
              )}
              <button
                onClick={removeFile}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/75 transition-colors"
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        <div className="relative flex items-end p-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="mr-2 p-2 rounded-full text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700 transition-colors"
            aria-label="Attach file"
          >
            <PaperclipIcon className="w-5 h-5" />
          </button>
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
            disabled={(!inputValue.trim() && !selectedFile) || isLoading}
            className="ml-3 p-2 rounded-full bg-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-600 text-neutral-200 hover:bg-neutral-600 transition-colors"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-neutral-500 border-t-neutral-200 rounded-full animate-spin"></div>
            ) : (
              <SendIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

         <div className="text-center text-neutral-500 text-sm mt-4">
        Made with ❤️ by Sainathreddy • © {new Date().getFullYear()} •
        <a
          href="https://www.linkedin.com/in/sainath666"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 ml-1"
        >
          LinkedIn
        </a>{" "}
        •
        <a
          href="https://github.com/sainath-666"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 ml-1"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default PromptInput;
