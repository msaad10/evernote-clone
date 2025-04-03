# Evernote Clone

A modern web-based note-taking application built with React, featuring rich text editing, notebook organization, and tag management.

## Features

- 📝 **Rich Text Editor**
  - Bold, italic, and underline formatting
  - Bullet list support
  - Real-time content updates
  - Smooth cursor handling

- 📚 **Notebook Management**
  - Create and delete notebooks
  - Organize notes by notebooks
  - Quick navigation between notebooks
  - Persistent storage

- 🏷️ **Tag System**
  - Add multiple tags to notes
  - Filter notes by tags
  - Quick tag management
  - Visual tag display

- 🌓 **Theme Support**
  - Light and dark mode
  - Smooth theme transitions
  - Persistent theme preference
  - Consistent styling across themes

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: CSS with CSS Variables
- **State Management**: React Context API
- **Rich Text Editing**: Native contentEditable

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/evernote-clone.git
   cd evernote-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5174
   ```

## Project Structure

```
evernote-clone/
├── src/
│   ├── components/
│   │   ├── RichTextEditor.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TagInput.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── NotebookModal.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
└── package.json
```

## Usage

### Creating a New Notebook
1. Click the "New Notebook" button in the sidebar
2. Enter a name for your notebook
3. Click "Save" to create the notebook

### Adding Tags
1. Select a notebook
2. Type a tag in the tag input field
3. Press Enter to add the tag
4. Click the × button to remove a tag

### Filtering by Tags
1. Click on a tag in the sidebar to filter notebooks
2. Click the × button next to the tag to clear the filter

### Switching Themes
1. Click the theme toggle in the top-right corner
2. Choose between light and dark mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Evernote's note-taking capabilities
- Built with modern web technologies
- Focused on user experience and simplicity
