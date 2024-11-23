
// src/components/TanzaniaAssistant.js
import React, { useState, useRef } from 'react';
import { Card } from './ui/card';
import { HelpCircle } from 'lucide-react';
import CategorySelector from './CategorySelector';
import ChatMessage from './ChatMessage';
import ChatInputForm from './ChatInputForm';
import SuggestionsList from './SuggestionsList';

const TanzaniaAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages(prev => [...prev, {
          type: 'outgoing',
          content: {
            type: 'image',
            url: reader.result,
            caption: 'Uploaded image for analysis'
          },
          timestamp: new Date().toISOString()
        }]);
        simulateImageAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateImageAnalysis = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'incoming',
        content: {
          type: 'text',
          text: 'Picha yako inaonesha dalili za ugonjwa wa mihogo uitwao "Cassava Mosaic Disease". Mapendekezo:\n\n1. Ondoa majani yaliyoathirika\n2. Tumia mbegu safi zilizothibitishwa\n3. Panda aina zinazostahimili ugonjwa\n4. Dhibiti wadudu waenezao ugonjwa'
        },
        timestamp: new Date().toISOString()
      }]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, {
      type: 'outgoing',
      content: {
        type: 'text',
        text: inputMessage
      },
      timestamp: new Date().toISOString()
    }]);
    setInputMessage('');
    // Add API call here
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white shadow-xl">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-center">Msaidizi wa Tanzania</h1>
          <p className="text-center text-gray-600 text-sm">
            Uliza swali au tuma picha kupata usaidizi
          </p>
        </div>

        <CategorySelector 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="h-[400px] overflow-y-auto p-4 space-y-4"
        >
          {messages.length === 0 ? (
            <SuggestionsList
              selectedCategory={selectedCategory}
              onSuggestionSelect={suggestion => {
                setInputMessage(suggestion);
                handleSubmit();
              }}
            />
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        <ChatInputForm
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSubmit={handleSubmit}
          onImageUpload={handleImageUpload}
        />

        {/* Quick Help */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <HelpCircle className="h-4 w-4" />
            <span>
              Unaweza kutuma picha au kuuliza maswali kuhusu kilimo, afya, 
              elimu, biashara na hali ya hewa.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TanzaniaAssistant;