import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [search, setSearch] = useState("");

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

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
