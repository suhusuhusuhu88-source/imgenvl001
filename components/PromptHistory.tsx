
import React from 'react';
import { HistoryIcon } from './Icon';

interface PromptHistoryProps {
  history: string[];
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

export const PromptHistory: React.FC<PromptHistoryProps> = ({ history, onSelect, disabled }) => {
  return (
    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
      <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
        <HistoryIcon className="w-5 h-5" />
        Prompt History
      </h3>
      {history.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-2">
          Your successful prompts will appear here for easy reuse.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {history.map((prompt, index) => (
            <button
              key={`${index}-${prompt}`}
              onClick={() => onSelect(prompt)}
              disabled={disabled}
              className="text-xs bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full hover:bg-purple-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title={prompt}
            >
              {prompt.length > 25 ? `${prompt.substring(0, 22)}...` : prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
