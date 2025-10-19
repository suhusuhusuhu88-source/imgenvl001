
import React from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon, ImageIcon } from './Icon';

interface ResultDisplayProps {
  originalImage: string | null | undefined;
  editedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageBox: React.FC<{title: string, imageUrl: string | null | undefined, children?: React.ReactNode}> = ({ title, imageUrl, children }) => (
  <div className="bg-gray-800 rounded-2xl p-4 flex flex-col h-full shadow-inner">
    <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
        {children}
    </div>
    <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg aspect-square">
        {imageUrl ? (
            <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-md" />
        ) : (
            <div className="text-gray-500 flex flex-col items-center">
                <ImageIcon className="w-16 h-16" />
                <span className="mt-2 text-sm">{title} image will appear here.</span>
            </div>
        )}
    </div>
  </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, editedImage, isLoading, error }) => {
  if (!originalImage && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full bg-gray-800 rounded-2xl p-8 min-h-[500px]">
        <ImageIcon className="w-24 h-24 text-gray-600" />
        <h2 className="mt-6 text-2xl font-bold text-gray-300">Your Edited Image Awaits</h2>
        <p className="mt-2 text-gray-400">Upload an image and write a prompt to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImageBox title="Original" imageUrl={originalImage} />
        
        <div className="bg-gray-800 rounded-2xl p-4 flex flex-col h-full shadow-inner">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-300">Edited</h3>
                {editedImage && (
                    <a
                        href={editedImage}
                        download="edited-image.png"
                        className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-purple-600 text-gray-200 hover:text-white font-medium py-2 px-3 rounded-md transition-colors duration-200"
                    >
                        <DownloadIcon className="w-4 h-4" />
                        Download
                    </a>
                )}
            </div>
            <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-lg aspect-square">
                {isLoading && (
                    <div className="flex flex-col items-center text-gray-400">
                    <Spinner size="lg" />
                    <p className="mt-4 text-center">AI is working its magic...</p>
                    </div>
                )}
                {error && <p className="text-red-400 p-4 text-center">{error}</p>}
                {editedImage && !isLoading && (
                    <img src={editedImage} alt="Edited" className="max-w-full max-h-full object-contain rounded-md animate-fade-in" />
                )}
                {!isLoading && !editedImage && !error && originalImage && (
                     <div className="text-gray-500 flex flex-col items-center p-4 text-center">
                        <ImageIcon className="w-16 h-16" />
                        <span className="mt-2 text-sm">Your generated image will appear here.</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
