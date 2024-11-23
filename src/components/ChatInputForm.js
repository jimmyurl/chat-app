// src/components/ChatInputForm.js
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Camera, Send } from 'lucide-react';

const ChatInputForm = ({ 
  inputMessage, 
  setInputMessage, 
  onSubmit, 
  onImageUpload 
}) => {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => document.getElementById('imageInput').click()}
        >
          <Camera className="h-4 w-4" />
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </Button>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Andika swali lako hapa..."
          className="flex-1"
        />
        <Button className="shrink-0" onClick={onSubmit}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInputForm;