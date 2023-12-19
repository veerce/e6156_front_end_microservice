import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyScreen from './MyScreen';
import LoginScreen from './LoginScreen'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recipes from './Recipes';
import Cuisine from './Cuisine';
import RecipeDetails from './RecipeDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/home' element={<Recipes/>}/>
        <Route path='/profile' element={<MyScreen/>}/>
        <Route path='/cuisinegenerator' element={<Cuisine/>}/>
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        {/* <Route path='/home' element={<Recipes/>}/> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
