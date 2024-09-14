export interface Movie {
    id: number;
    name: string;
    year: number;
    category: string;
    imdb: number;
    country: string;
    isTvSeries: boolean;
    isFavorite: boolean;
    summary: string;

  }

  export interface MovieState {
    movies: Movie[];
    favorites: number[];
  }
