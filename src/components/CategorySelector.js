import React from 'react';
import { Button } from './ui/button';
import { 
  Leaf, 
  BookOpen, 
  Building2, 
  Stethoscope,
  Sun
} from 'lucide-react';

export const categories = {
  agriculture: {
    icon: <Leaf className="w-6 h-6" />,
    title: "Kilimo",
    suggestions: [
      "Dalili za ugonjwa wa mihogo",
      "Mbinu bora za kilimo cha mahindi",
      "Ratiba ya kupanda mazao kanda ya kati",
      "Bei ya soko la mazao leo"
    ]
  },
  education: {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Elimu",
    suggestions: [
      "Matokeo ya kidato cha nne",
      "Tarehe za usajili vyuo vikuu",
      "Masomo ya VETA",
      "Mikopo ya elimu ya juu"
    ]
  },
  business: {
    icon: <Building2 className="w-6 h-6" />,
    title: "Biashara",
    suggestions: [
      "Usajili wa biashara ndogo",
      "Leseni za biashara",
      "Mikopo ya biashara",
      "Masoko ya bidhaa"
    ]
  },
  health: {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Afya",
    suggestions: [
      "Dalili za malaria",
      "Ratiba ya chanjo watoto",
      "Hospitali za karibu",
      "Bima ya afya"
    ]
  },
  weather: {
    icon: <Sun className="w-6 h-6" />,
    title: "Hali ya Hewa",
    suggestions: [
      "Hali ya hewa leo",
      "Utabiri wa mvua wiki hii",
      "Ushauri kwa wakulima"
    ]
  }
};

const CategorySelector = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="p-4 grid grid-cols-3 md:grid-cols-5 gap-2">
      {Object.entries(categories).map(([key, category]) => (
        <Button
          key={key}
          variant={selectedCategory === key ? "default" : "outline"}
          className="flex flex-col items-center p-2 h-auto"
          onClick={() => onCategorySelect(key)}
        >
          {category.icon}
          <span className="text-xs mt-1">{category.title}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;