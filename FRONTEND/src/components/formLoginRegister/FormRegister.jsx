import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { registerAction } from '../../reducers/userReducer';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const FormRegister = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    
    const resp = await registerAction(data);

    reset();
    if (resp?.success) {
        Swal.fire('Usuario Creado', resp.message, 'success');
      navigate('/login', { replace: true });
    } else {
      Swal.fire('Error', resp.message, 'error');
      console.log(resp.message);
    }
  };

  const handleClickShowPassword = (nameClass) => {
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
            placeholder='username'
            className='form-control'
            type='text'
            {...register('username', { required: true, maxLength: 30 })}
          />
          <label>Nombre de usuario</label>
          {errors.username && (
            <span className='password-checks error' role='alert'>
              {errors.username.message}
            </span>
          )}
        </div>
        <div className='form-floating mb-3'>
          <input
            placeholder='youremail@mail.com'
            className='form-control'
            type='email'
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
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
                message: 'Longitud minima is 6',
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
        <div>
          <label htmlFor='cars'>Selecciona un Rol:</label>

          <select name='cars' id='cars' {...register('role')}>
            <option value='LECTOR_ROLE'>Lector</option>
            <option value='CREATOR_ROLE'>Creador</option>
          </select>
        </div>
        <button type='submit' className='btn'>
          Registrarme
        </button>
      </form>
    </>
  );
};
