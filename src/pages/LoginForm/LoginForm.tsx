import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import './LoginForm.css';
import { RootState } from '../../store';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Geçerli bir email adresi giriniz').required('Email zorunludur'),
  password: yup
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir sayı içermelidir')
    .required('Şifre zorunludur'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.get(`http://localhost:5000/users`, {
        params: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.data.length > 0) {
        dispatch(login());
        localStorage.setItem('auth', 'true');
        navigate('/movies');
      } else {
        setLoginError('Geçersiz email veya şifre');
      }
    } catch (error) {
      setLoginError('Giriş işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <div>

    <h1 className="app-header">Movies App</h1> 
    <div className="container">
      
      <div className="login-form-container">
        <h2 className="login-title">Giriş Yap</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="E-posta"
              {...register('email')}
              className="form-input"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Şifre"
              {...register('password')}
              className="form-input"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button type="submit" className="login-button">Giriş &gt;</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
