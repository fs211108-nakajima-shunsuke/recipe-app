import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { apiConfig } from './config/config';
import Recipe from './components/Recipe';

function App() {

  const EDAMAM_APP_ID = apiConfig.edamamAppId;
  const EDAMAM_API_KEY = apiConfig.edamamApiKey;
  const DEEPL_API_KEY = apiConfig.deeplApiKey;

  const renderFlagRef = useRef(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus()
  }, []);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);
  const [label, setLabel] = useState([]);

  const getTranslate = (text) => {
    console.log("翻訳します");
    fetch(`https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}&text=${text}&target_lang=ja&source_lang=en`)
      .then(res => res.json())
      .then(data => setLabel(data.translations[0].text.split(","))
      )
  };


  const getRecipes = async () => {
    console.log("レシピを読み込んでいます...");
     fetch(`https://api.edamam.com/search?q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data.hits);
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

  //フラグで初回レンダリング時に起動しないように設定
  //レシピが読み込まれていないとエラーで不具合が出るため
  useEffect(() => {
    if (renderFlagRef.current) {
      console.log(recipes);
      const arrayText = recipes.map(recipe => recipe.recipe.label);
      const joinedText = arrayText.join(",");
      console.log(joinedText);
      getTranslate(joinedText);
    } else {
      renderFlagRef.current = true;
    }
  }, [recipes]);

  return (
    <div className="App">
      <form onSubmit={getSearch} >
        <input ref={inputRef} type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map((recipe, index) => (
          <Recipe
            key={recipe.recipe.label}
            title={label[index]}
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
