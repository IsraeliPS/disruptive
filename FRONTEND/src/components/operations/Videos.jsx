import ReactPlayer from 'react-player';

export const Videos = ({ link, concept }) => {
  return (
    <div className='videoCard'>
      <p>{concept}</p>
      <ReactPlayer
        width='150px'
        height='150px'
        controls
        url={link}
        style={{ borderRadius: '10px' }}
      />
    </div>
  );
};
