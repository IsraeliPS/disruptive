import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Checkbox = React.forwardRef(
  ({ label, name, value, onChange, defaultChecked, ...rest }, forwardedRef) => {
    const [checked, setChecked] = React.useState(defaultChecked);

    React.useEffect(() => {
      if (onChange) {
        onChange(checked);
      }
    }, [checked]);

    return (
      <div onClick={() => setChecked(!checked)} style={{ cursor: 'pointer' }}>
        <input
          style={{ display: 'none' }}
          ref={forwardedRef}
          type='checkbox'
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        [{checked ? 'X' : ' '}]{label}
      </div>
    );
  }
);

export const ModalComponent = ({ show, setShow, concept }) => {
  const handleClose = () => setShow(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const tema = useSelector((state) => state.operations.concepts);

  const value = tema.filter((arr) => arr.concept === concept);
  const { images, videos, texto } = value[0];

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setShow(false);
    console.log(data);
    // const token = getToken();
    // console.log('update', concept, token);
    // dispatch(updateConceptAction(concept, token));
    // return ;
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar {concept}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='form-floating mb-3'>
                <input
                  placeholder='Concepto'
                  control={control}
                  className='form-control '
                  type='text'
                  {...register('concept', {
                    required: 'El nuevo nombre de concepto es requerido',
                  })}
                />
                <label htmlFor='concept'>Nuevo Concepto</label>
                {errors.concept && (
                  <span className='concept-checks error' role='alert'>
                    {errors.concept.message}
                  </span>
                )}
              </div>

              <Controller
                name='checkbox'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox defaultChecked={images} label='images' />
                )}
              />
              {errors.example_3 && (
                <p class='error'>{errors.example_3.message}</p>
              )}

              <Controller
                name='checkbox'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox defaultChecked={videos} label='videos' />
                )}
              />
              <Controller
                name='checkbox'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox defaultChecked={texto} label='texto' />
                )}
              />
            </div>
            <button type='submit' className='btn'>
              Save Changes
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
