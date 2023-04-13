import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthenticateContext from '../context/AuthenticateContext';

import { Navbar } from '../components/navbar/Navbar';
import { getConceptsAction } from '../reducers/operationReducer';
import { Tematicas } from '../components/operations/Tematicas';
import { Videos } from '../components/operations/Videos';
import { Images } from '../components/operations/Images';
import { Textos } from '../components/operations/Textos';
import { BarOptions } from '../components/operations/BarOptions';

export const OperationScreen = () => {
  const { userAuth } = useContext(AuthenticateContext);
  const dispatch = useDispatch();

  const { concepts, images, video, texto, role } = useSelector(
    (state) => state.operations
  );

  useEffect(() => {
    dispatch(getConceptsAction());

    // eslint-disable-next-line
  }, [userAuth]);

  return (
    <>
      <Navbar />

      <div className='containerButtonTematica'>
        <div className='col-12 rowButton'>
          {concepts.map((concept) => (
            <Tematicas key={concept.tematicaId} {...concept} role={role} />
          ))}
        </div>
        {role !== 'LECTOR_ROLE' && (
          <div className='col-12 containerMedia'>
            {video.map((video) => (
              <Videos key={video.elementId} {...video} role={role} />
            ))}
          </div>
        )}
        {role !== 'LECTOR_ROLE' && (
          <div className='col-12 containerMedia'>
            {images.map((image) => (
              <Images key={image.elementId} {...image} role={role} />
            ))}
          </div>
        )}
        <div className='col-12 containerMedia'>
          {texto.map((text) => (
            <Textos key={text.elementId} {...text} role={role} />
          ))}
        </div>
      </div>

      {role !== 'LECTOR_ROLE' && <BarOptions role={role} />}
    </>
  );
};
