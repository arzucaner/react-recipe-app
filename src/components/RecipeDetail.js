import React, { useState, useEffect } from 'react';
import './RecipeDetail.css';

const RecipeDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recipeId) {
      setLoading(true);
      fetch(`https://dummyjson.com/recipes/${recipeId}`)  // Backticks kullanarak düzeltildi
        .then(response => response.json())
        .then(data => {
          setRecipe(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recipe details:', error);
          setError('An error occurred while fetching the recipe details.');
          setLoading(false);
        });
    }
  }, [recipeId]);

  if (loading) {
    return <div className="loading">Loading recipe details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipe) {
    return <div className="no-recipe">Select a recipe to see details</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.name || 'Unknown Recipe Name'}</h2>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.name || 'Recipe image'} className="recipe-image" />
      )}
      <p><strong>Ingredients:</strong> {recipe.ingredients ? recipe.ingredients.join(', ') : 'No ingredients listed.'}</p>
      <p><strong>Instructions:</strong> {recipe.instructions || 'No instructions provided.'}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty || 'Unknown'}</p>
    </div>
  );
};

export default RecipeDetail;



