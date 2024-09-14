import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieState } from '../models/Movie';

const initialState: MovieState = {
    movies: [],
    favorites: [],
  };

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter((id) => id !== movieId);
      } else {
        state.favorites.push(movieId);
      }
    },
  },
});

export const { setMovies, toggleFavorite } = movieSlice.actions;
export default movieSlice.reducer;