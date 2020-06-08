import React, {useEffect, useState} from 'react';
import db from "./firebase";
import OutlineCard from './components/Card';
import { Grid } from '@material-ui/core';

// function useFood(){
//   const [recipeTitle, setRecipeTitle] = useState([])

//   useEffect(() => {
//     firebase.firestore().collection('food').onSnapshot((snapshot)=>{
      
//     })
//   }, [])
//   return recipeTitle 
// }

let id= 0; 
const Food = () => {

  const [title, setTitle] = useState('');
  const [serving, setServing] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, selectCategory]= useState('food');
  


  // const fetchData = async ()=>{
  //   const foodRecipiesRes = await db.collection('food').get();
  //   const recipiesData = foodRecipiesRes.docs.map(recipe => recipe.data())
  //   setRecipes(recipiesData)
  
  // }
  const fetchAllRecipies=() =>{
    
      const foodRecipiesRes = db.collection('food');
      const drinksRecipiesRes = db.collection('drinks');
      const dessertsRecipiesRes = db.collection('desserts');
      Promise.all([foodRecipiesRes.get(), drinksRecipiesRes.get(), dessertsRecipiesRes.get() ])
      .then(promiseResults => {
        const mergedData = [];
        promiseResults.forEach( snapshot => {
          snapshot.forEach( doc => mergedData.push(doc.data()) );
        });
        setRecipes(mergedData)
        //console.log(mergedData)
        // return mergedData;
   })
  
  
    
    
  }

  useEffect(() =>{
    fetchAllRecipies()
  },[]);

  const addRecipe = e => {
    e.preventDefault();
    const recipeBody={
      title: title,
      serving: serving,
      ingredients: ingredients,
      description: description,
      category: selectedCategory
    }
    db.collection(selectedCategory).add(
      recipeBody
    )
    setTitle('');
    setServing('');
    setIngredients('');
    setDescription('');
    fetchAllRecipies()
  };
  return (
    
    <>
      <form onSubmit={addRecipe} >
              <label>Category : </label>
              <select value={selectedCategory} onChange={e=>selectCategory(e.target.value)}>
                <option value='food'>Food</option>
                <option value='drinks'>Drinks</option>
                <option value='desserts'>Desserts</option>
              </select>
              <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              onChange={e=> setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              name="serving"
              placeholder="Serving"
              onChange={e=> setServing(e.target.value)}
              value={serving}
            />
            <input
              type="text"
              name="ingredients"
              placeholder="Recipe Ingredients"
              //map?? Array!!!
              onChange={e=> setIngredients(e.target.value)}
              value={ingredients}
            />
            <input
              type="text"
              name="description"
              placeholder="Recipe Description"
              onChange={e=> setDescription(e.target.value)}
              value={description}
            />
    
          
            <button type="submit">Add Recipe</button>
          </form>
          {/* <h4> Recipes: </h4>
          {recipes.map(recipe => 
          <div>
            <h4>{recipe.title}</h4>
            <label>serving: {recipe.serving}</label> 
            <p>ingredients: </p> 
            <p>{recipe.ingredients}</p>
            <label>description: </label> 
            <p>{recipe.description}</p>
          </div>)} */}
          <Grid container>
           {recipes.map(recipe =><Grid item xs={3}> <OutlineCard props={recipe} key={id++}/> </Grid>)}
           </Grid>  
          </>
);


}

export default Food;