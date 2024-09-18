import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList/MovieList';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import LoginForm from './pages/LoginForm/LoginForm';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuth = localStorage.getItem('auth') === 'true';
    if (isAuth) {
      dispatch(login());
    }
  }, [dispatch]);
  return (
    <Routes>
      
      <Route path="/movies" element={<ProtectedRoute><MovieList /></ProtectedRoute>} />
      <Route path="/movies/:id" element={<ProtectedRoute><MovieDetail /></ProtectedRoute>} />
      
      <Route path="/" element={<LoginForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
