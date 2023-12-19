import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogoutButton from "./logout";
import CuisineGenerator from "./Cuisine"
import Recipes from './Recipes';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/home'; 
    navigate(path);
  }

  return (
    <header id="header">
      <div id="search_bar">
        <SearchComponent />
        {/* <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search by title, author, or ingredient" aria-label="Search"></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="search_bar_button">Search</button>
        </form> */}
      </div>

      <h1 id="main_title" onClick={routeChange}>RECIPEDIA</h1>
      <div id = "user_controls">
        <Profile />
        <LogoutButton />
        <CuisineButton />
      </div>
  </header>
  )
}

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef(null); // Ref for the search component

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownVisible(false);
      return;
    }

    const apiUrl = 'http://0.0.0.0:8011/recipes';
    try {
      const response = await fetch(`${apiUrl}?objects_filter=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();
      setSearchResults(results);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error('Error during fetch:', error);
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div ref={searchRef}>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
        <input 
          className="form-control" 
          type="search" 
          placeholder="Search by title, author, or ingredient" 
          aria-label="Search" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '300px' }}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" id="search_bar_button">Search</button>
      </form>
      {isDropdownVisible && (
        <div className="search-results-dropdown">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <span>{result.title} - {result.author_id}</span>
              </div>
            ))
          ) : (
            <div className="search-result-item">
              <span>No results found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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