import React from 'react';
import Main from './Main';
//import RecipiesFromAPI from './components/RecipiesFromAPI';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App" >
      <Navbar/>
      <h3>Add your recipe</h3>
      <Main/>
      {/* <RecipiesFromAPI/> */}
    </div>
  );
}

export default App;
