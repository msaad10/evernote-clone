import { useState } from 'react'
import Sidebar from './components/Sidebar'
import RichTextEditor from './components/RichTextEditor'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

function App() {
  const [notebooks, setNotebooks] = useState([
    { id: 1, name: 'Personal Notes', content: '', tags: ['personal', 'ideas'] },
    { id: 2, name: 'Work Projects', content: '', tags: ['work', 'projects'] },
    { id: 3, name: 'Ideas', content: '', tags: ['ideas', 'brainstorm'] }
  ]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [unlockedNotebooks, setUnlockedNotebooks] = useState(new Set());

  const handleNotebookSelect = (notebook) => {
    setSelectedNotebook(notebook);
    setSelectedTag(null);
  };

  const handleContentChange = (content) => {
    if (selectedNotebook) {
      setNotebooks(notebooks.map(notebook =>
        notebook.id === selectedNotebook.id
          ? { ...notebook, content }
          : notebook
      ));
      setSelectedNotebook(prev => ({ ...prev, content }));
    }
  };

  const handleSaveNotebook = (name) => {
    const newNotebook = {
      id: Date.now(),
      name,
      content: '',
      tags: [],
      password: null
    };
    setNotebooks([...notebooks, newNotebook]);
  };

  const handleDeleteNotebook = (notebookId) => {
    setNotebooks(notebooks.filter(notebook => notebook.id !== notebookId));
    if (selectedNotebook?.id === notebookId) {
      setSelectedNotebook(null);
    }
    // Remove from unlocked notebooks if it was unlocked
    setUnlockedNotebooks(prev => {
      const newSet = new Set(prev);
      newSet.delete(notebookId);
      return newSet;
    });
  };

  const handleAddTag = (tag) => {
    if (selectedNotebook && !selectedNotebook.tags.includes(tag)) {
      const updatedNotebook = {
        ...selectedNotebook,
        tags: [...selectedNotebook.tags, tag]
      };
      setNotebooks(notebooks.map(notebook =>
        notebook.id === selectedNotebook.id
          ? updatedNotebook
          : notebook
      ));
      setSelectedNotebook(updatedNotebook);
    }
  };

  const handleRemoveTag = (tag) => {
    if (selectedNotebook) {
      const updatedNotebook = {
        ...selectedNotebook,
        tags: selectedNotebook.tags.filter(t => t !== tag)
      };
      setNotebooks(notebooks.map(notebook =>
        notebook.id === selectedNotebook.id
          ? updatedNotebook
          : notebook
      ));
      setSelectedNotebook(updatedNotebook);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const handleSetPassword = (notebookId, password) => {
    setNotebooks(notebooks.map(notebook =>
      notebook.id === notebookId
        ? { ...notebook, password }
        : notebook
    ));
    // Remove from unlocked notebooks when setting a new password
    setUnlockedNotebooks(prev => {
      const newSet = new Set(prev);
      newSet.delete(notebookId);
      return newSet;
    });
  };

  const handleUnlockNotebook = (notebookId, password) => {
    const notebook = notebooks.find(n => n.id === notebookId);
    if (notebook && notebook.password === password) {
      setUnlockedNotebooks(prev => new Set(prev).add(notebookId));
      return true;
    }
    return false;
  };

  const filteredNotebooks = selectedTag
    ? notebooks.filter(notebook => notebook.tags.includes(selectedTag))
    : notebooks;

  return (
    <ThemeProvider>
      <div className="app">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <Sidebar 
          notebooks={filteredNotebooks}
          selectedNotebook={selectedNotebook}
          onNotebookSelect={handleNotebookSelect}
          onSaveNotebook={handleSaveNotebook}
          onDeleteNotebook={handleDeleteNotebook}
          onTagSelect={handleTagSelect}
          selectedTag={selectedTag}
          onSetPassword={handleSetPassword}
          onUnlockNotebook={handleUnlockNotebook}
          unlockedNotebooks={unlockedNotebooks}
        />
        <main className="main-content">
          {selectedNotebook ? (
            <RichTextEditor
              selectedNotebook={selectedNotebook}
              onContentChange={handleContentChange}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              isLocked={selectedNotebook.password && !unlockedNotebooks.has(selectedNotebook.id)}
            />
          ) : (
            <div className="no-notebook-selected">
              <h2>Select a notebook to start writing</h2>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
