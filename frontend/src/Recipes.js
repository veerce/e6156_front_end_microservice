import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import App from './App';
import './Recipes.css';
import Modal from './RecipeModal';
import LoginScreen from './LoginScreen'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchUserRecipes();
    }, []);

    const fetchUserRecipes = () => {
        fetch('http://ec2-54-91-9-29.compute-1.amazonaws.com:8011/recipes')
          .then(response => response.json())
          .then(data => {
              console.log("Fetched data:", data); // Check the fetched data
              setRecipes(data);
          })
          .catch(error => console.error('Error fetching recipes:', error));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    

    return (
        <div className="centered-container">
            <h1 className = "centered-heading">What's Cookin' Today:</h1>
           
            <ul>

            {recipes.map((recipe) => (
                <Link to={`/recipe/${recipe.recipe_id}`} key={recipe.recipe_id} style={{ textDecoration: 'none' }}>
                    <li key={recipe.recipe_id} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9'}}>
                        <h3><strong></strong>{recipe.title}</h3>
                        <p><strong>Author:</strong> {recipe.author_id}</p>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Steps:</strong> {recipe.steps}</p>
                    </li>
                </Link>
                ))}
                
            </ul>

            <div className="d-flex justify-content-center"> 
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2>My Popup</h2>
                    <p>This is the content of the popup!</p>
                </Modal>
            </div>
        </div>
    );
}

    

const Recipes = () => {
    return (
        <div>
            <App />
            <UserRecipes />
            {/* <RecipeModal /> */}
        </div>
        
    );
  };

  export default Recipes;