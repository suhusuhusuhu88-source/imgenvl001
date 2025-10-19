
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ResultDisplay } from './components/ResultDisplay';
import { editImage } from './services/geminiService';
import type { ImageFile } from './types';
import { fileToGenerativePart } from './utils/fileUtils';
import { PromptHistory } from './components/PromptHistory';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        file: file,
        dataUrl: reader.result as string,
      });
      setEditedImage(null); // Clear previous edit on new image upload
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async () => {
    const trimmedPrompt = prompt.trim();
    if (!originalImage || !trimmedPrompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const imagePart = await fileToGenerativePart(originalImage.file);
      const resultBase64 = await editImage(imagePart, trimmedPrompt);
      setEditedImage(`data:image/png;base64,${resultBase64}`);

      // Add unique prompt to history on success
      if (!promptHistory.includes(trimmedPrompt)) {
        setPromptHistory(prev => [trimmedPrompt, ...prev].slice(0, 15));
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, promptHistory]);
  
  const handleClear = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
  }

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg h-full flex flex-col space-y-6 sticky top-8">
                <ImageUploader onImageUpload={handleImageUpload} imagePreview={originalImage?.dataUrl ?? null} />
                {originalImage && (
                  <>
                    <PromptControls
                      prompt={prompt}
                      onPromptChange={setPrompt}
                      onGenerate={handleGenerate}
                      isLoading={isLoading}
                      disabled={!originalImage}
                    />
                    <PromptHistory
                        history={promptHistory}
                        onSelect={handleSelectPrompt}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleClear}
                        className="w-full text-center py-3 px-4 text-sm font-semibold rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                    >
                        Start Over
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <ResultDisplay 
                originalImage={originalImage?.dataUrl}
                editedImage={editedImage}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
