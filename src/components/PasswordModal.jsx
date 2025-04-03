import React, { useState } from 'react';
import './PasswordModal.css';

const PasswordModal = ({ isOpen, onClose, onConfirm, title, mode = 'set' }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password cannot be empty');
      return;
    }
    onConfirm(password);
    setPassword('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">
              {mode === 'set' ? 'Set password' : 'Enter password'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder={mode === 'set' ? "Enter new password" : "Enter existing password"}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="confirm-button">
              {mode === 'set' ? 'Set Password' : 'Unlock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal; 