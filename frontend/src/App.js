import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Header = () => {
  return (
    <div class="wrapper" id="header">
      <div id="search_bar" class="container">
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Find by title or author" aria-label="Search"></input>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="search_bar_button">Search</button>
        </form>
      </div>

      <div id="title">
        <text id="main_title">RECIPEDIA</text>
      </div>

      <div id="profile">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="profile_button">Profile</button>
      </div>
  </div>
  )
}

const App = () => {
  return (
    <Header />
  );
};

export default App;