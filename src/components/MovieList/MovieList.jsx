import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';
import "../../index.css"

function MovieList({ movies, numberOfMovies }) {
  const classes = useStyles();

  return (
    // <Grid container className={classes.moviesContainer}>
    <div className='gridforMovie' style={{height:'calc(100vh - 52px)',width:'calc(100vw - 252px)',marginLeft:'252px'}}> 
      {movies.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </div> 
    // </Grid>
  );
}

export default MovieList;
