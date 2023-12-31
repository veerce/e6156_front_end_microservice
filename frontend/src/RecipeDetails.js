import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css'
import { recipeURL, userURL, reviewURL } from './config';
import App from './App';


const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(`${recipeURL}/recipes/${recipeId}`)
          .then(response => response.json())
          .then(data => {
              console.log("Fetched data:", data); 
              setRecipeDetails(data);
          })
          .catch(error => console.error('Error fetching reviews:', error));
    };

    const fetchReviews = async () => {
      //gets all of the reviews for this recipe ID
      const response = await fetch(`${reviewURL}/recipe/${recipeId}`)
      .then(response => response.json())
          .then(data => {
              console.log("Fetched data:", data); 
              setReviews(data);
          })
          .catch(error => console.error('Error fetching reviews:', error));
    };

    fetchRecipeDetails();
    fetchReviews();
  }, [recipeId]);

  return (
    <div>
        < App />
      {recipeDetails && (
        <div>
          <h1>{recipeDetails.title}</h1>
          <h5><strong>Author: </strong>{recipeDetails.author_id}</h5>
          <h5><strong>Ingredients: </strong>{recipeDetails.ingredients}</h5>
          <h5><strong>Steps: </strong>{recipeDetails.steps}</h5>
        </div>
      )}
      <h2>Reviews:</h2>
      <ul>
            {reviews.map((review) => (
                <li key={review[0]}>
                <p><strong>Reviewer:</strong> {review[2]}</p>
                <p><strong>Date:</strong> {review[3].substring(0, 10)}</p>
                <p><strong>Rating:</strong> {review[4].toString().concat("/10")}</p>
                <p><strong>Review:</strong> {review[5]}</p>
                </li>
            ))}
      </ul>

    </div>
  );
};

export default RecipeDetails;
