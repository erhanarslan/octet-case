export interface Movie {
    id: number;
    name: string;
    category: string;
    year: number;
    imdb: number;
    coverImageUrl: string;
    isTvSeries: boolean;
    country: string;
  }
  
  export interface CardProps {
    movie: Movie;
    isFavorite: boolean;
    onFavoriteToggle: (id: number) => void;
  }
  