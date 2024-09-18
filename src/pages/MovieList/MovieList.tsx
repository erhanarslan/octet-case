import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/index';
import { setMovies, addFavorite, removeFavorite } from '../../store/movieSlice';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import './MovieList.css';
import { logout } from '../../store/authSlice';
import { Movie } from '../../models/Movie';


const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const favoriteCount = useSelector((state: RootState) => state.movies.favorites.length);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterBy, setFilterBy] = useState<string>('all'); // New filter state
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const sortSelectRef = useRef<HTMLSelectElement>(null);
  const filterSelectRef = useRef<HTMLSelectElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('auth');
    navigate('/');
  };
  const handleSortClick = () => {
    if (sortSelectRef.current) {
      sortSelectRef.current.click();
    }
  };
  const handleFilterClick = () => {
    if (filterSelectRef.current) {
      filterSelectRef.current.click();
    }
  };

  // Fetch movies
  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => {
        dispatch(setMovies(response.data));
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch movies');
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

  const filteredMovies = movies
    .filter(movie => {
      if (filterBy === 'favorites') {
        return favorites.includes(movie.id);
      }
      
      return true;
    })
    .filter(movie => movie.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'year') return b.year - a.year;
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
            <img src='/assets/images/search.png'></img>
          </div>
        </div>
        <p className="favorites">Favoriler: {favoriteCount}</p>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </header>
      <div className="title-section">
        <h1>Movies</h1>
        <div className="filter-sort-buttons">
  <div className="sort">
    <img 
      src='/assets/images/sort.png' 
      alt="Sort" 
      onClick={handleSortClick} 
    />
    {sortBy !== 'name' && (
      <span className="notification-dot"></span>
    )}
    <select  
      ref={sortSelectRef} 
      value={sortBy} 
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="name">Film Adı</option>
      <option value="year">Yayın Yılı</option>
      <option value="imdb">IMDB Puanı</option>
    </select>
  </div>
  <div className="filter">
    <img 
      src='assets/images/filter.png' 
      alt="Filter" 
      onClick={handleFilterClick} 
    />
    {filterBy !== 'all' && (
      <span className="notification-dot"></span>
    )}
    <select 
      ref={filterSelectRef} 
      value={filterBy} 
      onChange={(e) => setFilterBy(e.target.value)}
    >
      <option value="all">Yeni Eklenenler</option>
      <option value="favorites">Favorileri Göster</option>
    </select>
  </div>
</div>

      </div>
      <div className="movie-card-container">
        {filteredMovies.length == 0 ? <div className='not-found-movie'>
            <p>Aradığınız kriterlere uygun film bulunamadı.</p>
          </div> :
        filteredMovies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
        
      </div>
      
    </div>
  );
};

export default MovieList;
