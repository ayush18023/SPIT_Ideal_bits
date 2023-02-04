import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    movie:{},
    genre:"",
    filteredMovies:[]
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovie: (state, action) => {
        state.movies.push(action.payload);
        console.log("aascas",state.movies)
    },
  },
});
export const { addMovie } = movieSlice.actions;
export default movieSlice.reducer;
export const userSelector = (state) => state.user;
