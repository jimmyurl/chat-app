
// src/components/SuggestionsList.js
import React from 'react';
import { Button } from './ui/button';
import { categories } from './CategorySelector';

const SuggestionsList = ({ selectedCategory, onSuggestionSelect }) => {
  if (!selectedCategory) return null;

  return (
    <div className="space-y-2">
      <p className="text-gray-600 text-sm">Chagua swali au andika swali lako:</p>
      {categories[selectedCategory].suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="w-full justify-start text-left"
          onClick={() => onSuggestionSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

export default SuggestionsList;