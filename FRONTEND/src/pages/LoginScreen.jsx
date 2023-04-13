import React, { useState } from 'react'

import { Link  } from 'react-router-dom'
import { FormLogin } from '../components/formLoginRegister/FormLogin'

export const LoginScreen = () => {

    const [error, setError] = useState('')

    return (
        <>
            <section className='container login'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-6'>
                        <header className='login__content-welcome'>
                            <h2>
                                ¡Bienvenid@ a <br className='d-md-none'/> <span className='highlight'>La Aplicación</span>!
                            </h2>
                        </header>
                        <div className='login__card mt-5'>
                            <h3 className='text-center mb-3 highlight'>
                                Inicia sesión
                            </h3>
                            <div className='separator'/>
                            {
                                error &&
                                <div className='text-center alert alert-danger' role='alert'>
                                    {error}
                                </div>
                            }
                            <section className='login__content-form'>
                                <FormLogin setError={setError} />
                            </section>
                            
                            <div className='login__content-footer'>
                                <div className='separator'/>
                                <p>
                                    ¿No tienes una cuenta?
                                    <Link to='/register' className='highlight link'> ¡Registrate!</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
      )
}
