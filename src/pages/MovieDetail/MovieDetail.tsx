import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { Movie } from "../../models/Movie";
import { addFavorite, removeFavorite } from "../../store/movieSlice";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Film detayları alınamadı");
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
      <div className="movie-title-wrapper">
        <div className="movie-title">{movie.name}</div>
        <div className="favorites movie-favorite-count">
          Favoriler: {favorites.length}
        </div>
      </div>

      <div className="movie-image-wrapper">
        <img
          className="movie-image"
          src={movie.coverImageUrl}
          alt={movie.name}
        />
        <div className="heart-wrapper-detail">
          <button
            className="favorite-button-detail"
            onClick={handleFavoriteToggle}
          >
            {favorites.includes(movie.id) ? (
              <img src="/assets/images/heart-filled.svg" alt="heart-filled" />
            ) : (
              <img src="/assets/images/heart-empty.svg" alt="heart-empty" />
            )}
          </button>
        </div>
      </div>

      <p className="movie-summary">{movie.summary}</p>
      <div className="line"></div>
      <div className="movie-detail-imdb">
        <img className="imdb-logo" src="/assets/images/imdb.png" alt="IMDb" />
        <span className="imdb-rating">{movie.imdb}/100</span>
      </div>
      <div className="movie-card-category">
        <p>{movie.category}</p>
      </div>
      <div className="movie-card-category">
        <p>
          {movie.country} {movie.year}
        </p>
      </div>
    </div>
  );
};

export default MovieDetail;
