import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { apiConfig } from './config/config';
import Recipe from './components/Recipe';

function App() {

  const APP_ID = apiConfig.appId;
  const API_KEY = apiConfig.apiKey;

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus()
  }, []);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    console.log("レシピを読み込みました");
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        setRecipes(data.hits);
        console.log(data.hits);
    });
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  return (
    <div className="App">
      <form onSubmit={getSearch} >
        <input ref={inputRef} type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
