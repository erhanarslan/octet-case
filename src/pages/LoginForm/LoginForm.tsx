import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import './LoginForm.css';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Geçerli bir email adresi giriniz').required('Email zorunludur'),
  password: yup.string().min(8, 'Şifre en az 8 karakter olmalıdır').required('Şifre zorunludur'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      
      const response = await axios.get(`http://localhost:5000/users`, {
        params: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.data.length > 0) {
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
    <div className="container">
      <div className="header-container">
        <h1 className="LoginHeader">Movies App</h1>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email:</label>
            <input type="email" {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label>Şifre:</label>
            <input type="password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
