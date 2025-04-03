import React, { useState } from 'react';
import './TagInput.css';

const TagInput = ({ tags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="tag-input-container">
      <div className="tags-list">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button 
              className="remove-tag"
              onClick={() => onRemoveTag(tag)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags..."
        className="tag-input"
      />
    </div>
  );
};

export default TagInput; 