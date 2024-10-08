import React, { useState, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ onSelect }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch('https://dummyjson.com/recipes?limit=20&select=name,image')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data.recipes);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div id="dropdown-area">
      <label htmlFor="recipe-select">Select a Recipe!</label>
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <select id="recipe-select" onChange={(e) => onSelect(e.target.value)}>
          <option value="">Select a recipe</option>
          {recipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;




