import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchmovies } from '../../services/TMDB'
import NavBar from '../NavBar/NavBar';
import { Rating } from '@mui/material';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const SingleMovie = () => {
    const classes = useStyles();
    const [movie, setmovie] = useState(null)

    const { id } = useParams()
    const { movies } = useSelector(state=>state.movie)

    useEffect(()=>{
    
        setmovie(movies.find(x=>x.id==id))
    },[])

    return (
        <>
            <NavBar />
            <div style={{display:"flex",marginLeft:'300px',marginTop:"50px"}}>
                <div style={{width:"30%"}}>

                    <img className={classes.poster} src={movie?.thumbnail} alt=""  />

                </div>
                <div style={{marginLeft:"200px"}}>
                    <h1>{movie?.film_name}</h1>
                    <Rating readOnly value={movie?.vote_average / 2} precision={0.1} />
                    <p>{movie?.description}</p>
                    <h3>Category</h3>
                    <p>{movie?.category}</p>
                </div>


            </div>

        </>
    )
}

export default SingleMovie