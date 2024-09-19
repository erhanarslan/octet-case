import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { setMovies, addFavorite, removeFavorite } from "../../store/movieSlice";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SortMenu from "../../components/SortMenu/SortMenu";
import "./MovieList.css";
import { logout } from "../../store/authSlice";
import { Movie } from "../../models/Movie";

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const favoriteCount = useSelector(
    (state: RootState) => state.movies.favorites.length
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterBy, setFilterBy] = useState<string>("all");

  // Fetch movies
  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => {
        dispatch(setMovies(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch movies");
        setLoading(false);
      });
  }, [dispatch]);

  const handleFavoriteToggle = (id: number) => {
    if (favorites.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/");
  };

  const filteredMovies = movies
    .filter((movie) => {
      if (filterBy === "favorites") {
        return favorites.includes(movie.id);
      }

      return true;
    })
    .filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "year") return b.year - a.year;
      return b.imdb - a.imdb;
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <header className="header">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="What do you want to watch?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src="/assets/images/search.png"></img>
          </div>
        </div>
        <p className="favorites">Favoriler: {favoriteCount}</p>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </header>
      <div className="title-section">
        <h1>Movies</h1>

        <SortMenu
          setSortBy={setSortBy}
          setFilterBy={setFilterBy}
          sortBy={sortBy}
          filterBy={filterBy}
        />
      </div>
      <div className="movie-card-container">
        {filteredMovies.length === 0 ? (
          <div className="not-found-movie">
            <p>Aradığınız kriterlere uygun film bulunamadı.</p>
          </div>
        ) : (
          filteredMovies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
