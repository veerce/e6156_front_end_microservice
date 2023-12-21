import React, { useState, useEffect } from 'react';
import { recipeURL, userURL, reviewURL } from './config';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 5, zIndex: 1001 }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const RecipeSubmissionForm = ({ onSubmit }) => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ recipeName, ingredients, instructions });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipeName">Recipe Name:</label>
          <input id="recipeName" type="text" value={recipeName} onChange={e => setRecipeName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea id="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} required />
        </div>
        <button type="submit">Submit Recipe</button>
      </form>
    );
  };

  const ModalFunction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
  
    const handleFormSubmit = (formData) => {
      console.log('handle form here')
      console.log('Form Data:', formData);
      fetch(`${recipeURL}/recipes/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              author_id: "sarah_m", // hardcoded author_id
              images: "dummy.png", // hardcoded image
              ingredients: formData.ingredients, // ingredients from form
              steps: formData.instructions, // instructions from form mapped to 'steps'
              title: formData.recipeName // recipeName from form mapped to 'title'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle successful response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
        
        handleCloseModal();
    };
  
    return (
      <div>
        {/* <button onClick={handleOpenModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal">Inspired? Post a Recipe.</button> */}
        <button onClick={handleOpenModal} className="nav-button" data-bs-toggle="modal" data-bs-target="#recipeModal">Inspired? Post a Recipe.</button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2>Add a New Recipe</h2>
          <RecipeSubmissionForm onSubmit={handleFormSubmit} />
        </Modal>
      </div>
    );
  };
  
  export default ModalFunction;
