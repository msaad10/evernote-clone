import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
      <span className="theme-label">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
};

export default ThemeToggle; 