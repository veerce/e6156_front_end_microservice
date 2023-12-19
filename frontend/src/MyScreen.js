import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogoutButton from "./logout";
import Header from './App';
import './MyScreen.css';
import Modal from './RecipeModal';
import { recipeURL, userURL, reviewURL, graphQL } from './config';





const MyScreen = () => {
    const [recipes, setRecipes] = useState([]);
//   const [showRecipes, setShowRecipes] = useState(false);

    const [reviews, setReviews] = useState([]);
//   const [showReviews, setShowReviews] = useState(false);

    const [friends, setFriends] = useState([]);

    // const [dataToShow, setDataToShow] = useState([]);
    // let dataToShow = 'none';
    const [dataToShow, setDataToShow] = useState('none'); // Change this to state

    

  // This is a placeholder for where you might fetch real data
  const fetchRecipes = () => {
    // Simulate fetching data
        //fetch all recipes by this user
        fetch(`${recipeURL}/recipes?author_id=sarah_m`)
          .then(response1 => response1.json())
          .then(data1 => {
              console.log("Fetched data:", data1); // Check the fetched data
              setRecipes(data1);
              //console.log("test data:", setRecipes); 
          })
          .catch(error => console.error('Error fetching recipes:', error));
  }

  const handleShowRecipes = () => {
    fetchRecipes();
    //setDataToShow('recipes');
    // dataToShow = 'reviews';
    setDataToShow('recipes');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  const query = `{
    userReviews(userId: "sarah_m") {
      reviewId
      text
      recipeTitle
      rating
      date
    }
  }`;


  const fetchReviews = () => {
    return fetch(`${graphQL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data); // Check the fetched data
      setReviews(data);
    })
    .catch(error => console.error('Error fetching recipes:', error));
  }
  

  const handleShowReviews = () => {
    fetchReviews();
    //setDataToShow('reviews');
    // dataToShow = 'reviews';
    setDataToShow('reviews');
  };

  const fetchFriends = () => {
    fetch(`${userURL}/users`)
          .then(response => response.json())
          .then(data => {
              console.log("Fetched data:", data); // Check the fetched data
              setFriends(data);
          })
          .catch(error => console.error('Error fetching reviews:', error));

  }

  const handleShowFriends = () => {
      fetchFriends();
      setDataToShow('friends');
  }

  const handleDelete = (review_id) => {
    //delete this review from user's page
    fetch(`${reviewURL}/delete_review/${review_id}`, {
      method: 'DELETE',
    })
      
    .then(response => response.json())
      .then(data => {
          console.log('Delete worked:', data);
          //anything else needed to remove review from page?
      })
      .catch(error => console.error('Error fetching reviews:', error));
    }

  return (
    <div>
    <Header />
        <h1 className="welcome-message">
          Welcome Back, Sarah!
        </h1>
      <div className="nav-buttons">
        <button className="nav-button" onClick={handleShowRecipes}>My Recipes</button>
        <button className="nav-button" onClick={handleShowReviews}>My Reviews</button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2>My Popup</h2>
          <p>This is the content of the popup!</p>
        </Modal>
        <button className="nav-button" onClick={handleShowFriends}>My Friends</button>
      </div>
      
      {dataToShow == 'recipes' && (
        <div>
          <h2 className = "idk">My Recipes</h2>
          <ul>
                {recipes.map((recipe) => (
                    <div key={recipe.recipe_id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9'}}>
                        <h2>{recipe.title}</h2>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Steps:</strong> {recipe.steps}</p>
                    </div>
                ))}
          </ul>
        </div>
      )}

    {dataToShow == 'reviews' && (
        <div>
          <h2 className = "idk">My Reviews</h2>
          <ul>

                {reviews.map((review) => (
                    <div key={review.review_id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9'}}>
                        <h2>{review.title}</h2>
                        <p><strong>Your Review:</strong> {review.text}</p>
                        <p><strong>Your Rating:</strong> {review.rating}</p>
                        <p><strong>Date Posted:</strong> {review.date}</p>
                        <button className="delete-button" onClick={() => handleDelete(review.review_id)}>Delete</button>
                    </div>
                ))} 

                
          </ul>
        </div>
      )}

    {dataToShow == 'friends' && (
            <div>
              <h2 className = "idk">My Friends</h2>
              <ul>
                    {friends.map((friend) => (
                        <div className = "friend-card" key={friend.user_id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9'}}>
                            <h3>{friend.first_name} {friend.last_name}</h3>
                            <p><strong> {friend.user_id}</strong></p>
                            <p className = "friend-email"><strong>Email:</strong> {friend.email}</p>
                        </div>
                    ))}
              </ul>
            </div>
          )}

    
    </div>
  );
};

export default MyScreen;