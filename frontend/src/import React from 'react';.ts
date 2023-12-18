import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginScreen from './LoginScreen'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchUserRecipes();
    }, []);

    const fetchUserRecipes = () => {
        fetch('https://review-management-402504.ue.r.appspot.com/recipe/21')
          .then(response => response.json())
          .then(data => {
              console.log("Fetched data:", data); // Check the fetched data
              setRecipes(data);
          })
          .catch(error => console.error('Error fetching recipes:', error));
    };

    return (
        <div className="container">
            <h1>Here's What's Cookin' Today:</h1>
            <div className="d-flex justify-content-center"> 
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal">
                    Add Your Recipe
                </button>
            </div>
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index} style={{ margin: '10px 0', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9' }}>
                        {recipe.name}
                    </li>
                ))}
            </ul>

            {/* Modal Component */}
            {/* ... */}
        </div>
    );
};

const Recipes = () => {
    return (
        <UserRecipes />
    );
  };