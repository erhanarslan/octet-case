import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleRedirect = () => {
    console.log('Redirecting based on authentication status:', isAuthenticated);
    if (isAuthenticated) {
      navigate('/movies'); 
    } else {
      navigate('/'); 
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <p>
        <button onClick={handleRedirect}>Ana sayfaya dön</button>
      </p>
    </div>
  );
};

export default NotFound;
