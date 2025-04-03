import React, { useState } from 'react';
import NotebookModal from './NotebookModal';
import PasswordModal from './PasswordModal';
import './Sidebar.css';

const Sidebar = ({ notebooks, selectedNotebook, onNotebookSelect, onSaveNotebook, onDeleteNotebook, onTagSelect, selectedTag, onSetPassword, onUnlockNotebook, unlockedNotebooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [notebookToEdit, setNotebookToEdit] = useState(null);
  const [notebookToProtect, setNotebookToProtect] = useState(null);
  const [passwordModalMode, setPasswordModalMode] = useState('set');

  const handleNewNotebook = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditNotebook = (notebook) => {
    setNotebookToEdit(notebook);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveNotebook = (name) => {
    if (modalMode === 'create') {
      onSaveNotebook(name);
    }
    setIsModalOpen(false);
  };

  const handleDeleteNotebook = () => {
    if (notebookToEdit) {
      onDeleteNotebook(notebookToEdit.id);
    }
    setIsModalOpen(false);
  };

  const handleProtectNotebook = (notebook, e) => {
    e.stopPropagation();
    setNotebookToProtect(notebook);
    setPasswordModalMode('set');
    setIsPasswordModalOpen(true);
  };

  const handleUnlockNotebook = (notebook, e) => {
    e.stopPropagation();
    setNotebookToProtect(notebook);
    setPasswordModalMode('unlock');
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirm = (password) => {
    if (notebookToProtect) {
      if (passwordModalMode === 'set') {
        onSetPassword(notebookToProtect.id, password);
      } else {
        const success = onUnlockNotebook(notebookToProtect.id, password);
        if (!success) {
          alert('Incorrect password');
          return;
        }
      }
    }
    setIsPasswordModalOpen(false);
    setNotebookToProtect(null);
  };

  // Get all unique tags
  const allTags = [...new Set(notebooks.flatMap(notebook => notebook.tags))];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notebooks</h2>
        <button className="new-notebook-btn" onClick={handleNewNotebook}>
          <span>+</span> New Notebook
        </button>
      </div>
      
      <div className="tags-section">
        <div className="tags-header">
          <h3>Tags</h3>
          {selectedTag && (
            <button 
              className="clear-filter-btn"
              onClick={() => onTagSelect(null)}
              title="Clear filter"
            >
              ×
            </button>
          )}
        </div>
        <div className="tags-list">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <ul className="notebook-list">
        {notebooks.map((notebook) => (
          <li
            key={notebook.id}
            className={`notebook-item ${selectedNotebook?.id === notebook.id ? 'active' : ''}`}
            onClick={() => onNotebookSelect(notebook)}
            onDoubleClick={() => handleEditNotebook(notebook)}
          >
            <div className="notebook-header">
              <div className="notebook-name">{notebook.name}</div>
              {notebook.password && (
                <button
                  className="lock-button"
                  onClick={(e) => unlockedNotebooks.has(notebook.id) ? handleProtectNotebook(notebook, e) : handleUnlockNotebook(notebook, e)}
                  title={unlockedNotebooks.has(notebook.id) ? "Change password" : "Unlock notebook"}
                >
                  {unlockedNotebooks.has(notebook.id) ? "🔒" : "🔓"}
                </button>
              )}
            </div>
            <div className="notebook-tags">
              {notebook.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <NotebookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNotebook}
        onDelete={handleDeleteNotebook}
        mode={modalMode}
        notebook={notebookToEdit}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
        title={notebookToProtect ? `Set password for ${notebookToProtect.name}` : ''}
        mode={passwordModalMode}
      />
    </div>
  );
};

export default Sidebar; 