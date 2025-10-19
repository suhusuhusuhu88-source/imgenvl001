
import React from 'react';
import { SparklesIcon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-3">
        <SparklesIcon className="w-10 h-10 text-purple-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          AI Photo Editor
        </h1>
      </div>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
        Upload your image, describe your desired changes, and let Gemini bring your vision to life.
      </p>
    </header>
  );
};
