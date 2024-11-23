import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Trash2, Copy, Check, Send } from 'lucide-react';

const API_KEY = "YOUR_API_KEY";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const chatContainerRef = useRef(null);

  const suggestions = [
    { id: 1, text: "What is artificial intelligence?" },
    { id: 2, text: "How does machine learning work?" },
    { id: 3, text: "Explain neural networks" }
  ];

  useEffect(() => {
    // Load saved chats and theme from localStorage
    const savedChats = localStorage.getItem('saved-chats');
    const savedTheme = localStorage.getItem('themeColor');
    
    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    }
    if (savedTheme) {
      setIsDarkMode(savedTheme !== 'light_mode');
    }
  }, []);

  useEffect(() => {
    // Save chats to localStorage whenever messages change
    localStorage.setItem('saved-chats', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (userMessage) => {
    setIsGenerating(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: userMessage }]
          }]
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const apiResponse = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '$1');

      setMessages(prev => [...prev, {
        type: 'incoming',
        text: apiResponse,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'incoming',
        text: error.message,
        error: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const messageText = inputMessage.trim();
    
    if (!messageText || isGenerating) return;

    setMessages(prev => [...prev, {
      type: 'outgoing',
      text: messageText,
      timestamp: new Date().toISOString()
    }]);
    
    setInputMessage('');
    await generateResponse(messageText);
  };

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete all the chats?')) {
      setMessages([]);
      localStorage.removeItem('saved-chats');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('themeColor', !isDarkMode ? 'dark_mode' : 'light_mode');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h1 className="text-xl font-bold dark:text-white">Chat Interface</h1>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="dark:text-gray-200"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="dark:text-gray-200"
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="p-4 grid gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    setInputMessage(suggestion.text);
                    handleSubmit();
                  }}
                >
                  {suggestion.text}
                </Button>
              ))}
            </div>
          )}

          {/* Chat Container */}
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'outgoing'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                  } ${message.error ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-200' : ''}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.type === 'incoming' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopy(message.text)}
                      >
                        <Copy size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="dark:bg-gray-700 dark:text-white"
                disabled={isGenerating}
              />
              <Button type="submit" disabled={isGenerating}>
                <Send size={20} />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;