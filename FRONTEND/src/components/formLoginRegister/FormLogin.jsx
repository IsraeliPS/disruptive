import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import AuthenticateContext from '../../context/AuthenticateContext';
import { setToken } from '../../lib/sessionStorage';
import { login } from '../../services/users/userService';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const FormLogin = ({ setError }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useContext(AuthenticateContext);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      login(data).then((res) => {
        if (res.success) {
          Swal.fire('Bienvenido', res.message, 'success');

          setUserAuth({
            ...userAuth,
            payload: res.payload.userId,
            name: res.payload.username,
            role: res.payload.role,
          });
          setToken(res.payload.token);
          reset();
          navigate('/operation', { replace: true });
        } else {
          Swal.fire('Login Failed, user or password incorrect', '', 'error');
          const error = 'Login Failed, user or password incorrect';
          setError(error);
        }
      });
    } catch (e) {
      console.log('error de login', e);
    }
  };

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
    if (isShowPassword) {
      document.querySelectorAll('.floatingPassword').forEach((input) => {
        input.type = 'text';
      });
      document.querySelectorAll('.show-password').forEach((p) => {
        p.textContent = 'Ocultar';
      });
      return;
    }
    document.querySelectorAll('.floatingPassword').forEach((input) => {
      input.type = 'password';
    });
    document.querySelectorAll('.show-password').forEach((p) => {
      p.textContent = 'Mostrar';
    });
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-floating mb-3'>
          <input
            placeholder='youremail@mail.com'
            className='form-control'
            type='email'
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'El correo electrónico no es válido',
              },
            })}
          />
          <label htmlFor='email'>Correo electrónico</label>
          {errors.email && (
            <span className='password-checks error' role='alert'>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='form-floating mb-3'>
          <p
            className='show-password'
            onClick={() => handleClickShowPassword()}
          >
            Mostrar
          </p>
          <input
            id='password'
            className='form-control floatingPassword'
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
            type='password'
          />
          <label htmlFor='password'>Contraseña</label>
          {errors.password && (
            <span className='password-checks error' role='alert'>
              {errors.password.message}
            </span>
          )}
        </div>
        <button type='submit' className='btn'>
          Iniciar sesión
        </button>
      </form>
    </>
  );
};
