import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
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
        fetch('https://review-management-402504.ue.r.appspot.com/reviews')
        // fetch('http://ec2-3-93-174-27.compute-1.amazonaws.com:8011/users')
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
                {recipes.map((recipe, index) => (
                    <li key={index} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9'}}>
                    <p>Author: {recipe[0]}</p>
                    <p>Date: {recipe[3]}</p>
                    <p>Rating: {recipe[4]}</p>
                    <p>Review: {recipe[5]}</p>

                    {/* <p>Author: {recipe.first_name} {recipe.last_name}</p>
                    <p>Email: {recipe.email}</p> */}
                    </li>
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