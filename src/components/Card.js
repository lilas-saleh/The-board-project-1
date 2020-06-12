import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import db from '../firebase';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', //16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  console.log(props)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [ingredients, updateIngredients] = useState(props.props.ingredients);
  const [description, updateDescription] = useState(props.props.description);




  const handleExpandClick =() => {
    setExpanded(!expanded);
  };

// Delete each recipe from db and fetch all
  const deleteRecipe = (id,category) =>{
    db.collection(category).doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    props.refetch()
  }

  const editButtonClicked= ()=>{
    handleExpandClick()
    //it should also show the button that supposed to be hidden


  }
  // BUG on the second submit
  const editRecipeOnSubmitChanges= (category,id)=>{ 
    db.collection(category).doc(id)
    .onSnapshot(()=> {
        db.collection(category).doc(id).update(
        {
          ingredients: ingredients,
          description: description
        });
    });
    console.log('changes submitted')
    console.log(ingredients)
  }


  return (

    <Card className={classes.root} style={{margin: 10}}>
      <CardHeader
      title={props.props.title}
      subheader={props.props.serving}
      />
      <CardContent>
        <img src = {props.props.image} width='100%' alt=""/>
      </CardContent>

      <CardActions disableSpacing>

      <FormControlLabel
      control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
      // label="Favorites"
      />

      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={()=>deleteRecipe(props.props.id,props.props.category)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit">
        <IconButton aria-label="edit"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={editButtonClicked}
          aria-expanded={expanded}>
          <EditIcon />
        </IconButton>
      </Tooltip>


      <IconButton
        className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
        <ExpandMoreIcon />
      </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>
          Ingredients:
          <br/>
          <InputBase
          className={classes.margin}
          inputProps={{ 'aria-label': 'naked' }}
          rowsMax={10}
          label=" Ingridient:"
          multiline
          onChange= {e => updateIngredients(e.target.value)}
          defaultValue={props.props.ingredients}
          />
        </Typography>

        <Typography paragraph>
          Description:
          <br/>
          <InputBase
          className={classes.margin}
          defaultValue={props.props.description}
          inputProps={{'aria-label' : 'naked'}}
          onChange= {e => updateDescription(e.target.value)}
          multiline
          rowsMax={10}
          />
        </Typography>  

        {/* Dont forget to hide the button */}
        {/* <Box component="div" visibility="hidden"> */}
          <Button variant="outlined" color="secondary" visibility="hidden" onClick={()=>editRecipeOnSubmitChanges(props.props.category,props.props.id)}>
            Submit changes
          </Button>
        {/* </Box> */}
        
        

        </CardContent>
      </Collapse>
    </Card>
  );
}

