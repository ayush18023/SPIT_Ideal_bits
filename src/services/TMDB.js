import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
const data=[
  {
    id:1,
    film_name:"Black Adam",
    vote_average:4,
    thumbnail:"https://upload.wikimedia.org/wikipedia/en/a/a9/Black_Adam_%28film%29_poster.jpg",
    description:"Black Adam is a 2022 American superhero film starring Dwayne Johnson as the titular DC Comics character. The film is a spin-off to Shazam! (2019) and the 11th film in the DC Extended Universe (DCEU). The film was directed by Jaume Collet-Serra and written by Adam Sztykiel, Rory Haines and Sohrab Noshirvani. In addition to Johnson, the film stars Aldis Hodge, Noah Centineo, Sarah Shahi, Marwan Kenzari, Quintessa Swindell and Pierce Brosnan. Produced by New Line Cinema, DC Films, Seven Bucks Productions and FlynnPictureCo. and distributed by Warner Bros. Pictures, the film follows an ancient superhuman as he is released from his magic imprisonment by a group of archeologists to free the nation of Kahndaq from the crime syndicate Intergang.",
    location:"mumbai",
    category:"Romance",
    eth:1.04,
    viewable:0
  },
  {
    id:2,
    film_name:"ADI PURUSH",
    vote_average:4,
    thumbnail:"https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/11/adipurush002.jpg",
    description:"asjajhvkja",
    location:"pune",
    category:"action",
    eth:1.26,
    viewable:0
  },
  // {
  //   id:3,
  //   film_name:"ADI PURUSH",
  //   vote_average:4,
  //   thumbnail:"https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/11/adipurush002.jpg",
  //   description:"asjajhvkja",
  //   location:"pune",
  //   category:"action",
  //   eth:1.26,
  //   viewable:0
  // },
  // {
  //   id:4,
  //   film_name:"ADI PURUSH",
  //   vote_average:4,
  //   thumbnail:"https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/11/adipurush002.jpg",
  //   description:"asjajhvkja",
  //   location:"pune",
  //   category:"action",
  //   eth:1.26,
  //   viewable:0
  // },
  // {
  //   id:5,
  //   film_name:"ADI PURUSH",
  //   vote_average:4,
  //   thumbnail:"https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/11/adipurush002.jpg",
  //   description:"asjajhvkja",
  //   location:"pune",
  //   category:"action",
  //   eth:1.26,
  //   viewable:0
  // }
]

export const fetchmovies=()=>{
  return data
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}&page=${page}`;
        }
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
        }
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?api_key=${tmdbApiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        return `movie/popular?api_key=${tmdbApiKey}&page=${page}`;
      },

    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovie: builder.query({
      query: (id) => `/movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,

    }),
    getRecommendation: builder.query({
      query: ({ movieId, list }) => `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),
    // Get Actor
    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    // Get Movies by Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    // Get list
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationQuery, useGetMoviesByActorIdQuery, useGetActorQuery, useGetListQuery } = tmdbApi;
