import './App.css';
import React, { useEffect, useState } from 'react';
import { apiConfig } from './config/config';

function App() {

  const APP_ID = apiConfig.appId;
  const API_KEY = apiConfig.apiKey;

  const [search, setSearch] = useState("");

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q="banana"&app_id=${APP_ID}&app_key=${API_KEY}`)
    const data = await response.json();
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">
      <form>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
    </div>
  );
}

export default App;
