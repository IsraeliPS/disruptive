import React from 'react';

export const Textos = ({ link, concept }) => {
  return (
    <div className='textoCard'>
      <p>{concept}</p>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        Abrir archivo
      </a>
    </div>
  );
};
