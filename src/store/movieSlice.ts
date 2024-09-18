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
    addFavorite(state, action: PayloadAction<number>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
});

export const { setMovies, addFavorite,removeFavorite  } = movieSlice.actions;
export default movieSlice.reducer;