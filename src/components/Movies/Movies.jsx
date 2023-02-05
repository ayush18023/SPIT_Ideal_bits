import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchmovies, useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovie, NavBar } from '..';
import { addMovie } from '../../app/MovieReducer';
import banner from '../../assets/images/banner.jpeg'

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 16 : 19;
  // const [data, setdata] = useState([])
  const dispatch=useDispatch()
  const { movies } =useSelector(state=>state.movie)
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  useEffect(()=>{
    if(movies.length===0){
    
      // dispatch(addMovie())
      let x = fetchmovies()
      x.forEach(obj=>{
        dispatch(addMovie(obj))
      })
    }
  },[])

  // const isFetching=0


  // if (!data.length) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" marginTop="20%">
  //       <CircularProgress size="4rem" />

  //     </Box>

  //   );
  // }

  // if (!data.length) {
  //   return (
  //     <Box display="flex" alignItems="center" mt="20px">
  //       <Typography variant="h4">
  //         No movies that match that name
  //         <br />
  //         Please search for something else

  //       </Typography>

  //     </Box>
  //   );
  // }
  // if (error) return 'An error has occured';
  return (
    <>
      {/* <FeaturedMovie movie={movies[0]} /> */}
      <img src={banner} alt="" style={{width:"100vw",opacity:0.5,filter:"brightness(75%)"}} />
      <h2 style={{position:"relative",left:"500px",top:"-200px"}}>YOUR MOVIES.{"\n"} WHEN AND WHERE YOU WANT IT</h2>
      <NavBar/>
      <div><MovieList movies={movies} numberOfMovies={numberOfMovies} /></div>
      {/* <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} /> */}
    </>
  );
}

export default Movies;
