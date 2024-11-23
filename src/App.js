// Usage in App.js:
import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">My Chat Application</h1>
          </div>
        </header>
        
        <main>
          <ChatInterface />
        </main>
        
        <footer className="bg-white dark:bg-gray-800 mt-8">
          <div className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-400">
            © 2024 My Chat App
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;