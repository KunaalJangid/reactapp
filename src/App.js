import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "2fe983f2";
  const APP_KEY = "d2b3c0e2a1e197948851c84ba227469c";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  // useEffect() function to fetch data from API at once
  useEffect( () => {
    getRecipes();
  }, [query]);

  // Use an arrow function along with async fetchthe response and convert into a .json type to play with it
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits); // 
  }

  // To make the text box editable
  const updateSearch = e => {
    setSearch(e.target.value);// Value of the input
    console.log(search);
  }

  // To search for the items on the push of Submit button
  const getSearch = e => {
    e.preventDefault(); // To stop page refresh
    setQuery(search); // Add Finished updated value
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
}

export default App;
