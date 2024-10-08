import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import RecipeDetail from './components/RecipeDetail';

const App = () => {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>QuickCuisine</h1>
        <button onClick={toggleTheme}>{isDarkMode ? 'Activate Light Mode' : 'Activate Dark Mode'}</button>       
      </header>
      <main>
        <Dropdown onSelect={setSelectedRecipeId} />
        {selectedRecipeId && (
          <RecipeDetail recipeId={selectedRecipeId} />
        )}
      </main>
    </div>
  );
};

export default App;


