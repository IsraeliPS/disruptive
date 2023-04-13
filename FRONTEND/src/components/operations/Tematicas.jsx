import React, { useState } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import {
  deleteConceptAction,
  getAllMediaAction,
  // updateConceptAction,
} from '../../reducers/operationReducer';
import { getToken } from '../../lib/sessionStorage';

import { MdOutlineModeEdit } from 'react-icons/md';
import { BsTrash3 } from 'react-icons/bs';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ModalComponent } from './ModalComponent';

export const Tematicas = ({ concept, linkImageCategory, role }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClick = () => {
    const token = getToken();
    if (token) dispatch(getAllMediaAction(concept, token));
  };

  const DeleteConcept = (concept, role) => {
    const token = getToken();

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteConceptAction(concept, role, token));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
    <div className='containerCard'>
      <button className='cardTema' onClick={handleClick}>
        <h1>{concept}</h1>
        <LazyLoadImage
          className='imageTematica'
          src={linkImageCategory}
          alt={concept}
        />
      </button>
      {role !== 'LECTOR_ROLE' && (
        <div className='buttonsChange'>
          <button className='buttonUpdate' onClick={handleShow}>
            <MdOutlineModeEdit size='30px' color='white' />
          </button>
          {role === 'ADMIN_ROLE' && (
            <button
              className='buttonDelete'
              onClick={() => DeleteConcept(concept, role)}
            >
              <BsTrash3 size='30px' color='white' />
            </button>
          )}
        </div>
      )}
      <ModalComponent show={show} setShow={() => setShow()} concept={concept}/>
    </div>
  );
};
