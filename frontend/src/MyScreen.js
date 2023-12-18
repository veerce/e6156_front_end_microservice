import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogoutButton from "./logout";
import Header from './App';
import './MyScreen.css';



const MyScreen = () => {
    const [recipes, setRecipes] = useState([]);
//   const [showRecipes, setShowRecipes] = useState(false);

    const [reviews, setReviews] = useState([]);
//   const [showReviews, setShowReviews] = useState(false);

    // const [dataToShow, setDataToShow] = useState([]);
    // let dataToShow = 'none';
    const [dataToShow, setDataToShow] = useState('none'); // Change this to state

    

  // This is a placeholder for where you might fetch real data
  const fetchRecipes = () => {
    // Simulate fetching data
        //fetch all recipes by this user
        fetch('http://ec2-54-221-183-160.compute-1.amazonaws.com:8011/recipes?objects_filter=author:john_c')
          .then(response1 => response1.json())
          .then(data1 => {
              console.log("Fetched data:", data1); // Check the fetched data
              setRecipes(data1);
              console.log("test data:", setRecipes); 
          })
          .catch(error => console.error('Error fetching recipes:', error));
  }

  const handleShowRecipes = () => {
    fetchRecipes();
    //setDataToShow('recipes');
    // dataToShow = 'reviews';
    setDataToShow('recipes');
  };

  const fetchReviews = () => {
    // Simulate fetching data
        fetch('https://review-management-402504.ue.r.appspot.com/user/sarah_m')
          .then(response => response.json())
          .then(data => {
              console.log("Fetched data:", data); // Check the fetched data
              setReviews(data);
          })
          .catch(error => console.error('Error fetching reviews:', error));
  }

  const handleShowReviews = () => {
    fetchReviews();
    //setDataToShow('reviews');
    // dataToShow = 'reviews';
    setDataToShow('reviews');
  };

  return (
    <div>
    <Header />
        <h1 className="welcome-message">
          Welcome Back, Sarah!
        </h1>
      <div className="nav-buttons">
        <button className="nav-button" onClick={handleShowRecipes}>My Recipes</button>
        <button className="nav-button" onClick={handleShowReviews}>My Reviews</button>
      </div>
     
      
      {dataToShow == 'recipes' && (
        <div>
          <h2 className = "idk">My Recipes</h2>
          <ul>
                {recipes.map((recipe, index) => (
                    <li key={index}>
                    <p>Title: {recipe[3]}</p>
                    <p>Ingredients: {recipe[3]}</p>
                    <p>Steps: {recipe[4]}</p>
                    </li>
                ))}
          </ul>
        </div>
      )}

    {dataToShow == 'reviews' && (
        <div>
          <h2 className = "idk">My Reviews</h2>
          <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                    <p>Date written: {review[3].substring(0, 10)}</p>
                    <p>Your Rating: {review[4].toString().concat("/10")}</p>
                    <p>Review: {review[5]}</p>
                    </li>
                ))}
          </ul>
        </div>
      )}

    
    </div>
  );
};

export default MyScreen;