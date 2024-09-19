import React from "react";
import { CardProps } from "../../models/CardProps";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, isFavorite, onFavoriteToggle }: CardProps) => {
  const { coverImageUrl, name, category, country, year, imdb, isTvSeries } =
    movie;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <div className="movie-card-image-wrapper">
        <img className="movie-card-image" src={coverImageUrl} alt={name} />
        <div>
          {isTvSeries && <span className="badge">TV SERIES</span>}
          <div className="heart-wrapper">
            <button
              className="favorite-button"
              onClick={() => onFavoriteToggle(movie.id)}
            >
              {isFavorite ? (
                <img src="assets/images/heart-filled.svg" alt="heart-filled" />
              ) : (
                <img src="assets/images/heart-empty.svg" alt="heart-empty" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="movie-card-body" onClick={handleCardClick}>
        <div className="movie-card-country">
          <p>
            {country}, {year}
          </p>
        </div>
        <div className="movie-card-title">
          <p>{name}</p>
        </div>
        <div className="movie-card-imdb">
          <img className="imdb-logo" src="/assets/images/imdb.png" alt="IMDb" />
          <span className="imdb-rating">{imdb}/100</span>
        </div>
        <div className="movie-card-category">
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
