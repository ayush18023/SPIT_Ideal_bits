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
    viewableMovie:(state,action)=>{
      state.movies.forEach((element, index) => {
        if(element.id == action.payload) {
            state.movies[index]["viewable"] = 1;
        }
      });
    },
    unviewableMovie:(state,action)=>{
      state.movies.forEach((element, index) => {
        if(element.id == action.payload) {
            state.movies[index]["viewable"] = 0;
        }
      });
    }

  },
});
export const { addMovie , viewableMovie , unviewableMovie} = movieSlice.actions;
export default movieSlice.reducer;
export const userSelector = (state) => state.user;
