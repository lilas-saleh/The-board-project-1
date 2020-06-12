import React, {useEffect, useState} from 'react';
import db from "./firebase";
import Card from './components/Card';
import { Grid } from '@material-ui/core';
import Form from './components/Form' 

const Main = () => {
  const [recipes, setRecipes] = useState([]);
  

  // Fetch from all 3 collections at the same time 
  const fetchAllRecipies=() =>{
    console.log('Fetching')
    const foodRecipiesRes = db.collection('food');
    const drinksRecipiesRes = db.collection('drinks');
    const dessertsRecipiesRes = db.collection('desserts');
    Promise.all([foodRecipiesRes.get(), drinksRecipiesRes.get(), dessertsRecipiesRes.get() ])
    .then(promiseResults => {
      const mergedData = [];
      promiseResults.forEach( snapshot => {
        snapshot.forEach( doc => {
            const data = doc.data();
            // Adding the id to the object
            data.id = doc.id;
            console.log(data)
            mergedData.push(data)
          }    
        );
      });
      setRecipes(mergedData)
    })
  }

  useEffect(() =>{
  fetchAllRecipies();
    
  },[]);


  
  return (
    <>
      <Form fetchAllRecipies={fetchAllRecipies}/>
      <Grid container>
        {recipes.map(recipe => <Grid item xs={3}><Card props={recipe} refetch={fetchAllRecipies} key={recipe.id}/></Grid>)}
      </Grid>  
    </>
);
}

export default Main;