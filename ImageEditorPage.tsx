
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ai } from '../services/gemini';

// Helper to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const ImageEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setHistory([reader.result]);
          setCurrentHistoryIndex(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (currentHistoryIndex < 0 || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Convert base64 string back to a file-like object for the API
      const currentImageBase64 = history[currentHistoryIndex];
      const res = await fetch(currentImageBase64);
      const blob = await res.blob();
      const file = new File([blob], "temp-image.png", { type: blob.type });

      const imagePart = await fileToGenerativePart(file);
      const textPart = { text: prompt };

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [imagePart, textPart] },
      });

      let foundImage = false;
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64String = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                const newImageSrc = `data:${mimeType};base64,${base64String}`;
                
                // Update history
                const newHistory = history.slice(0, currentHistoryIndex + 1);
                newHistory.push(newImageSrc);
                setHistory(newHistory);
                setCurrentHistoryIndex(newHistory.length - 1);

                foundImage = true;
                break;
            }
        }
      }

      if (!foundImage) {
        setError('The model did not return an image. Try a different prompt.');
      }

    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
  };


  return (
    <div className="min-h-screen bg-background-dark text-white">
      <header className="sticky top-0 z-10 flex items-center bg-background-dark/80 p-4 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold">AI Image Editor</h2>
        <div className="w-24 flex justify-end gap-2">
            <button onClick={handleUndo} disabled={currentHistoryIndex <= 0} className="disabled:opacity-50">
                <span className="material-symbols-outlined text-2xl">undo</span>
            </button>
            <button onClick={handleRedo} disabled={currentHistoryIndex >= history.length - 1} className="disabled:opacity-50">
                <span className="material-symbols-outlined text-2xl">redo</span>
            </button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Image Upload Area */}
        <div className="w-full aspect-square bg-card-dark rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-surface-dark">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleImageUpload} className="hidden" />

            {history.length > 0 ? (
                 <img src={history[currentHistoryIndex]} alt="Current view" className="w-full h-full object-contain rounded-xl" />
            ) : (
                <div className="text-center text-text-dark-secondary space-y-4">
                    <div className="flex flex-col items-center gap-2">
                         <span className="material-symbols-outlined text-5xl">upload_file</span>
                         <p>Upload an image to start</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => fileInputRef.current?.click()} className="bg-surface-dark px-4 py-2 rounded-lg text-sm font-semibold">
                            Upload Photo
                        </button>
                        <button onClick={() => cameraInputRef.current?.click()} className="bg-surface-dark px-4 py-2 rounded-lg text-sm font-semibold">
                            Take Photo
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        {history.length > 0 && (
          <>
            {/* Prompt Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your edit (e.g., 'add a retro filter')"
              className="w-full bg-card-dark rounded-xl p-4 placeholder:text-text-dark-secondary focus:ring-2 focus:ring-primary focus:outline-none"
              rows={3}
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="w-full h-14 bg-primary text-white font-bold rounded-xl flex items-center justify-center disabled:bg-surface-dark disabled:text-text-dark-secondary"
            >
              {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : 'Generate'}
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
      </main>
    </div>
  );
};

export default ImageEditorPage;
