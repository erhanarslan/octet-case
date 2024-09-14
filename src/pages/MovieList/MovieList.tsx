import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '../../models/Movie';
import './MovieList.css'; 

const MovieList: React.FunctionComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/movies') 
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch movies');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <h1>Movie List</h1>
      <div className="card-container">
        {movies.map(movie => (
          <div key={movie.id} className="card">
            
            <div className="card-body">
              <h2 className="card-title">{movie.name}</h2>
              <p className="card-category">{movie.category}</p>
              <p className="card-year">Year: {movie.year}</p>
              <p className="card-imdb">IMDB: {movie.imdb}</p>
              <p className="card-country">Country: {movie.country}</p>
              {movie.isTvSeries && <span className="badge">TV Series</span>}
              <p className="card-summary">{movie.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
