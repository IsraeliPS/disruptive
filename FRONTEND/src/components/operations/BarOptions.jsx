import React from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';
import { ImVideoCamera, ImFileText2 } from 'react-icons/im';

export const BarOptions = ({ role }) => {
  return (
    <div className='barraOpciones'>
      {role === 'ADMIN_ROLE' && (
        <button className='buttonOptions'>
          <AiFillAppstore size='30px' color='white' />
          Nuevo tema
        </button>
      )}
      <button className='buttonOptions'>
        <BsCardImage size='30px' color='white' />
        <span>Nueva Imagen</span>
      </button>
      <button className='buttonOptions'>
        <ImVideoCamera size='30px' color='white' />
        <span>Nuevo Video</span>
      </button>
      <button className='buttonOptions'>
        <ImFileText2 size='30px' color='white' />
        <span>Nuevo Archivo</span>
      </button>
    </div>
  );
};
