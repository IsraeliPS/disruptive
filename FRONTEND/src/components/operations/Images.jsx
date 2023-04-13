import { LazyLoadImage } from 'react-lazy-load-image-component';

export const Images = ({ link, concept }) => {
  return (
    <button className='imageCard'>
      <p>{concept}</p>
      <LazyLoadImage className='imageArchivo' src={link} alt={concept} />
      <a href={link} target='_blank' rel='noopener noreferrer'>
        Abrir Imagen
      </a>
    </button>
  );
};
