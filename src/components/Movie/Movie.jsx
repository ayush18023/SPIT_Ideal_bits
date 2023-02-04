import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import NavBar from '../NavBar/NavBar';

function Movie({ movie, i }) {
  const classes = useStyles();
  return (
    <>
      {/* <NavBar/> */}
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
        <Grow in key={i} timeout={(i + 1) * 250}>

          <Link className={classes.links} to={`/movie/${movie.id}`}>
            <img
              // src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
              src={movie.thumbnail}
              alt={movie.film_name}
              className={classes.image}
            />
            <Typography className={classes.title} variant="h5">{movie.film_name}</Typography>
            {/* <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}> */}
              <div style={{zIndex:100}}>
                {/* <Rating readOnly value={movie.vote_average / 2} precision={0.1} /> */}
                <div style={{display:"flex",alignItems:"center",color:"white"}}>
                  <img src={require("../../assets/genres/ethereum.png")} alt="" />
                  <p>{movie.eth}</p>
                </div>
              </div>
            {/* </Tooltip> */}
          </Link>
        </Grow>

      </Grid>
    </>

  );
}

export default Movie;
