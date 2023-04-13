import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteToken, getToken } from '../../lib/sessionStorage';
import {
  addDataUserAction,
  logoutAction,
} from '../../reducers/operationReducer';
import { getByToken } from '../../services/operations/operationServices';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      getByToken(token).then((res) => {
        if (res) {
          dispatch(addDataUserAction(res.payload));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = useSelector((state) => state.operations.username);

  const handleLogout = () => {
    deleteToken();
    dispatch(logoutAction());
    navigate('/login', { replace: true });
  };

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end'>
        <ul className='navbar-nav ml-auto'>
          <span className='nav-item nav-link text-info'>
            Bienvenid@ {state} !!!
          </span>
          <button
            className='nav-item nav-link btn btn-logout'
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </ul>
      </div>
    </nav>
  );
};
