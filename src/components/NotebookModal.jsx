import React, { useState } from 'react';
import './NotebookModal.css';

const NotebookModal = ({ isOpen, onClose, onSave, onDelete, mode, notebook }) => {
  const [notebookName, setNotebookName] = useState(mode === 'edit' ? notebook?.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notebookName.trim()) {
      onSave(notebookName);
      setNotebookName('');
      onClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this notebook?')) {
      onDelete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === 'create' ? 'Create New Notebook' : 'Edit Notebook'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={notebookName}
            onChange={(e) => setNotebookName(e.target.value)}
            placeholder="Enter notebook name"
            autoFocus
          />
          <div className="modal-buttons">
            {mode === 'edit' && (
              <button type="button" className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">{mode === 'create' ? 'Create' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotebookModal; 