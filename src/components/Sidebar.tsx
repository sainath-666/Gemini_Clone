import React from "react";
import { ChatSession } from "../../types";
import { PlusIcon, MenuIcon, GeminiIcon } from "./icons";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  sessions,
  activeSessionId,
  onNewChat,
  onSelectChat,
}) => {
  return (
    <>
      <div
        className={`fixed top-4 left-4 z-20 md:hidden ${
          !isOpen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={onToggle}
          className="p-2 text-neutral-300 hover:text-white"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-10 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col w-72 bg-[#1e1f20] text-white p-4`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <GeminiIcon className="h-4" />
            <h1 className="text-xl font-semibold">Gemini Clone</h1>
          </div>
          <button
            onClick={onToggle}
            className="p-2 md:hidden text-neutral-300 hover:text-white"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={onNewChat}
          className="flex items-center gap-3 p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-medium w-full"
        >
          <PlusIcon className="w-5 h-5" />
          New Chat
        </button>

        <div className="mt-8 flex-1 overflow-y-auto">
          <p className="text-sm font-medium text-neutral-400 px-3 mb-2">
            Recent
          </p>
          <div className="flex flex-col gap-1">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSelectChat(session.id)}
                className={`px-3 py-2 rounded-md cursor-pointer text-sm truncate ${
                  activeSessionId === session.id
                    ? "bg-neutral-700 text-neutral-100"
                    : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                {session.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
