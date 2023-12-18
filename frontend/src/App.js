import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogoutButton from "./logout";
import CuisineGenerator from "./Cuisine"
import Recipes from './Recipes';
import { useNavigate } from 'react-router-dom';
import SearchComponent from "./Search"



const Header = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/home'; 
    navigate(path);
  }

  return (
    <header id="header">
      <div id="search_bar">
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Find by title or author" aria-label="Search"></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="search_bar_button">Search</button>
        </form>
      </div>

      <h1 id="main_title" onClick={routeChange}>RECIPEDIA</h1>
      <div id = "user_controls">
        {/* <SearchComponent /> */}
        <Profile />
        <LogoutButton />
        <CuisineButton />
      </div>
  </header>
  )
}

const Profile = () => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/profile'; 
    navigate(path);
  }

  return(
    <div id="profile">
        <button onClick={routeChange} class="btn btn-outline-success my-2 my-sm-0" type="submit" id="profile_button">Profile</button>
      </div>
  )
}

const CuisineButton = () => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/cuisinegenerator'; 
    navigate(path);
  }

  return(
    <div id="profile">
        <button onClick={routeChange} class="btn btn-outline-success my-2 my-sm-0" type="submit" id="profile_button">Cuisine Generator</button>
      </div>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      {/* <Recipes /> */}
    </div>
  );
};

export default App;