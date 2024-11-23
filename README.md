# Tanzania Assistant (Msaidizi wa Tanzania)

A React-based chatbot application designed to provide assistance to Tanzanian users in Swahili across various sectors including agriculture, education, business, health, and weather information.

## Features

- 📱 Modern, responsive user interface
- 🗣️ Full Swahili language support
- 📸 Image upload and analysis capabilities
- 🎯 Category-based navigation
- 💡 Smart suggestions based on selected categories
- 💬 Real-time chat interface
- 🎨 Clean and intuitive design using shadcn/ui components

## Categories

The assistant provides support in five main categories:

- **Kilimo (Agriculture)**: Crop disease identification, farming best practices, planting schedules, and market prices
- **Elimu (Education)**: Exam results, university registration dates, vocational training, and student loans
- **Biashara (Business)**: Business registration, licensing, loans, and market information
- **Afya (Health)**: Disease symptoms, vaccination schedules, hospital locations, and health insurance
- **Hali ya Hewa (Weather)**: Current weather, rain forecasts, and farmer advisories

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/tanzania-assistant.git
cd tanzania-assistant
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required shadcn/ui components:
```bash
npx shadcn-ui@latest add card button input
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/
│   ├── CategorySelector.js    # Category selection interface
│   ├── ChatMessage.js        # Individual chat message component
│   ├── ChatInputForm.js      # Chat input and image upload form
│   ├── SuggestionsList.js    # Category-based suggestions
│   ├── TanzaniaAssistant.js  # Main application component
│   └── ui/                   # shadcn/ui components
├── App.js
└── index.js
```

## Dependencies

- React
- Lucide React (for icons)
- shadcn/ui (for UI components)
- Tailwind CSS (for styling)

## Features in Detail

### Category Selection
Users can select from five different categories, each with its own set of predefined suggestions and specialized assistance.

### Image Analysis
The application supports image uploads for analysis, particularly useful for:
- Agricultural disease identification
- Document verification
- Health-related visual queries

### Smart Suggestions
Each category comes with context-aware suggestions that help users:
- Frame their questions effectively
- Get quick access to common queries
- Navigate complex topics easily

### Bilingual Support
While the interface is primarily in Swahili, the application structure supports easy localization for additional languages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styling system powered by [Tailwind CSS](https://tailwindcss.com/)