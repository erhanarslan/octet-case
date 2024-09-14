import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';
import MovieList from './pages/MovieList/MovieList';
import ProtectedRoute from './components/ProtectedRoute';
import MovieDetail from './pages/MovieDetail/MovieDetail';

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
    </div>
  );
};

export default App;
