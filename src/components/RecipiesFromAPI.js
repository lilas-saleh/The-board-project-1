import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';


const RecipiesFromAPI= ()=>{
    const ID= '83e4aaa3';
    const KEY= '5c59c17cb9fa386fb4813cb58c537a60';
    //const mealType= 'dinner'
    const [recipes, setRecipes]= useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('breakfast');


    useEffect(()=>{
        getRecipies();
    },[query])

    const getRecipies= async ()=>{
        const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`)
        const data = await response.json();
        setRecipes(data.hits);
        //console.log(data.hits)
        
    }

    const updateSearch= e=>{
        setSearch(e.target.value)
    }

    const getSearch = e =>{
       e.preventDefault();
       setQuery(search);
       setSearch(' ');

    } 


    return(
        <div className='App'> 
            <form className='search-form' onSubmit={getSearch}>
                <input type='text' className='search-bar' value={search} onChange={updateSearch}></input>
                <button type="submit" className='search-button'> SEARCH FOR A RECIPE</button>               
            </form>
            {console.log(recipes)}
            {recipes.map(recipe=>(
                <Recipe
                key={recipe.recipe.label} 
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories} 
                image={recipe.recipe.image} 
                ingredients={recipe.recipe.ingredients}
                />
            ))}
        </div>

    ); 

}

export default RecipiesFromAPI;