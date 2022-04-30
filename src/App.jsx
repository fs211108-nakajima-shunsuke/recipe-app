import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { apiConfig } from './config/config';
import Recipe from './components/Recipe';

function App() {

  const EDAMAM_APP_ID = apiConfig.edamamAppId;
  const EDAMAM_API_KEY = apiConfig.edamamApiKey;

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus()
  }, []);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    console.log("レシピを読み込みました");
    fetch(`https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}`)
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
