import React, { useState } from 'react';
import { Languages, ArrowRightLeft, X } from 'lucide-react';

export default function Tools() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceLang, setSourceLang] = useState('Chinese (Traditional)');
  const [targetLang, setTargetLang] = useState('English');
  const [inputText, setInputText] = useState('');
  
  // Mock translation state
  const translatedText = inputText ? `[Mock Translation in ${targetLang}]: ${inputText}` : '';

  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <div className="p-5 space-y-5">
      {/* Tools List */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center cursor-pointer active:scale-95 transition-transform"
      >
        <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mr-4">
          <Languages size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">Quick Translate</h3>
          <p className="text-gray-500 text-sm">Translate text instantly</p>
        </div>
      </div>

      {/* Translation Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          
          {/* Modal Content - Slides up from bottom like iOS */}
          <div className="mt-auto bg-[#F2F2F7] w-full rounded-t-3xl shadow-2xl flex flex-col h-[80vh] animate-in slide-in-from-bottom-full duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-200">
              <h2 className="font-bold text-lg">Translator</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200 active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Language Selection Row */}
            <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm mb-4">
              <span className="font-semibold text-blue-600 flex-1 text-center">{sourceLang}</span>
              <button onClick={handleSwap} className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <ArrowRightLeft size={20} />
              </button>
              <span className="font-semibold text-blue-600 flex-1 text-center">{targetLang}</span>
            </div>

            {/* Dual Text Boxes */}
            <div className="flex-1 px-4 space-y-4 overflow-y-auto pb-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <p className="text-xs font-medium text-gray-400 mb-2">{sourceLang}</p>
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text here..."
                  className="w-full h-24 bg-transparent outline-none resize-none text-gray-900 text-lg"
                ></textarea>
              </div>

              <div className="bg-blue-500 rounded-2xl shadow-md p-4 text-white">
                <p className="text-xs font-medium text-blue-200 mb-2">{targetLang}</p>
                <div className="w-full min-h-[6rem] text-lg font-medium">
                  {translatedText || <span className="opacity-50">Translation will appear here...</span>}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
