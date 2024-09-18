import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { Movie } from '../../models/Movie';
import { addFavorite, removeFavorite } from '../../store/movieSlice';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:5000/movies/${id}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Film detayları alınamadı');
        setLoading(false);
      });
  }, [id]);

  const handleFavoriteToggle = () => {
    if (movie) {
      if (favorites.includes(movie.id)) {
        dispatch(removeFavorite(movie.id));
      } else {
        dispatch(addFavorite(movie.id));
      }
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Film bulunamadı</p>;

  return (
    <div className="movie-detail">
      <div className="movie-title">
        {movie.name}
        <div className="movie-favorite-count favorites">
          Favoriler: {favorites.length}
        </div>
      </div>

      <div className="movie-image">
        <img src={movie.coverImageUrl} alt={movie.name} />
      </div>

      <p className="movie-summary">{movie.summary}</p>
      <div className='line'></div>
      <div className="movie-info">
        <img className='imdb-logo' src="/assets/images/imdb.png" alt="IMDB Logo" />
        <p>
          <strong>{movie.imdb}</strong> | {movie.category} | {movie.country} / {movie.year}
        </p>
      </div>

      <button className="favorite-toggle-button" onClick={handleFavoriteToggle}>
        {favorites.includes(movie.id) ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
      </button>
    </div>
  );
};

export default MovieDetail;
