import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogoutButton from "./logout";
import Header from './App';
import './Cuisine.css';

const CuisineGenerator = () => {
  const [ingredientList, setIngredientList] = useState('');
  const [dishName, setDishName] = useState('');
  const [result, setResult] = useState('');

  const fetchCuisine = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('ingredientList', ingredientList);
    encodedParams.set('title', dishName);

    const options = {
      method: 'POST',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/cuisine',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '15d62043c3msha7efa4fee9aff07p17c44djsnce351c7ef170', 
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      displayCuisine(response.data);
    } catch (error) {
      console.error('Error:', error);
      displayError('An error occurred while fetching cuisine data.');
    }
  };

  const displayCuisine = (response) => {
    if (response && response.cuisine) {
      setResult(`Cuisine: ${response.cuisine}`);
    } else {
      setResult("Cuisine not found. Let us know what it is.");
    }
  };

  const displayError = (error) => {
    setResult(`Error: ${error}`);
  };

  return (
    
    <div>
        <Header />
      <h1>Cuisine Generator</h1>
      <div className = "idk">
        <label htmlFor="ingredientList">Ingredients:</label>
        <input
            type="text"
            id="ingredientList"
            value={ingredientList}
            onChange={e => setIngredientList(e.target.value)}
            required
        />
        <br />
        <label htmlFor="title">Dish Name:</label>
        <input
            type="text"
            id="title"
            value={dishName}
            onChange={e => setDishName(e.target.value)}
            required
        />
        <br />
        <br />
        <button id="findCuisineButton" onClick={fetchCuisine}>Find Cuisine</button>
      </div>
      
      <div id="result">
        {result}
      </div>
    </div>
  );
};

export default CuisineGenerator;
