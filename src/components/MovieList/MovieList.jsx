import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';
import "../../index.css"
import { useSelector } from 'react-redux';
import nodata from '../../assets/images/nodata.png'

function MovieList({ movies, numberOfMovies }) {
  const classes = useStyles();
  const actual = useSelector(state => state.movie.genre)
  console.log(movies)
  const mov = movies.filter(movie => movie.category.toLowerCase() === actual)
  console.log(mov.length)
  console.log(actual)
  if (movies.length === 0) {
    return (
      <img src={nodata} style={{ width: '500px', height: '500px', position: 'relative', transform: 'translate(75%,0)', marginLeft: '252px' }} ></img>
    )
  }
  else {
    if (actual === "") {
      return (
        <div className='gridforMovie' style={{ height: 'calc(100vh - 52px)', width: 'calc(100vw - 252px)', marginLeft: '252px', marginTop: '45px' }}>
          {movies.map((movie, i) => (
            <Movie key={i} movie={movie}></Movie>
          ))}
        </div>
      )
    }
    else {
      if (mov.length !== 0) {
        return (
          <div className='gridforMovie' style={{ height: 'calc(100vh - 52px)', width: 'calc(100vw - 252px)', marginLeft: '252px', marginTop: '45px' }}>
            {mov.map((movie, i) => (
              <Movie key={i} movie={movie}></Movie>
            ))}
          </div>
        )
      }
      else {
        return (
          <img src={nodata} style={{ width: '500px', height: '500px', position: 'relative', transform: 'translate(75%,0)', marginLeft: '252px' }} ></img>)
      }

    }
  }
}

export default MovieList;
