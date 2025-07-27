import React from 'react';

interface WelcomeViewProps {
  onPromptClick: (prompt: string) => void;
}

const PromptCard = ({ title, subtitle, onClick }: { title: string, subtitle: string, onClick: () => void }) => (
  <div
    onClick={onClick}
    className="p-4 bg-[#1e1f20] rounded-xl hover:bg-[#2a2b2c] cursor-pointer transition-colors relative"
  >
    <p className="text-neutral-200 text-base font-medium">{title}</p>
    <p className="text-neutral-400 text-sm">{subtitle}</p>
  </div>
);

const WelcomeView: React.FC<WelcomeViewProps> = ({ onPromptClick }) => {
  const prompts = [
    { title: "Plan a trip", subtitle: "to see the Northern Lights" },
    { title: "Write a thank-you note", subtitle: "to my interviewer" },
    { title: "Debug my code", subtitle: "that's not centering a div" },
    { title: "Explain a concept", subtitle: "like quantum computing in simple terms" },
  ];

  return (
    <div className="flex flex-col items-start h-full justify-center w-full max-w-4xl mx-auto px-4 py-8">
      <div className="w-full">
        <h1 className="text-5xl md:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
          Hello,
          <br />
          How can I help you today?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prompts.map((p, i) => (
            <PromptCard
              key={i}
              title={p.title}
              subtitle={p.subtitle}
              onClick={() => onPromptClick(`${p.title} ${p.subtitle}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;