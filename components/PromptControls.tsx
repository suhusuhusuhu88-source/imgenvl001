
import React from 'react';
import { Spinner } from './Spinner';
import { SparklesIcon } from './Icon';

interface PromptControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, onPromptChange, onGenerate, isLoading, disabled }) => {
  return (
    <div className="flex flex-col space-y-4 flex-grow">
      <label htmlFor="prompt" className="text-sm font-medium text-gray-300">
        Editing Prompt
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g., 'make the sky a vibrant sunset', 'add a cat wearing a wizard hat', 'turn this into a cyberpunk city scene'"
        rows={5}
        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-200"
        disabled={disabled}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || disabled || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Spinner />
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate
          </>
        )}
      </button>
    </div>
  );
};
