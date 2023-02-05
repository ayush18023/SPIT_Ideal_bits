import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  movie: {},
  genre: "",
  filteredMovies: []
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload);
      console.log("aascas", state.movies)
    },
    addCategory: (state, action) => {
      console.log(action.payload)
      state.genre = action.payload
      console.log(state.genre)
    }
  },

});
export const { addMovie, addCategory } = movieSlice.actions;
export default movieSlice.reducer;
export const userSelector = (state) => state.user;
