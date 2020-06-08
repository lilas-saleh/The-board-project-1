import React from 'react';
import Food from './Food';
import RecipiesFromAPI from './components/RecipiesFromAPI';

function App() {
  return (
    <div className="App">
      <h1>THE AMAZING COOKBOOK</h1>
      <h3>Add your recipe</h3>
      <Food/>
      <RecipiesFromAPI/>
    </div>
  );
}

export default App;
