import React from 'react'
import { Link } from 'react-router-dom'
import { FormRegister } from '../components/formLoginRegister/FormRegister'


export const RegisterScreen = () => {
    return (
        <>
            <section className='container login'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-6'>
                        <header className='login__content-welcome'>
                            <h2>
                                ¡Bienvenido a <br className='d-md-none'/> <span className='highlight'>Mi Aplicación</span>!
                            </h2>
                        </header>
                        <div className='login__card'>
                            <h3 className='text-center mb-3 highlight'>
                                Registrate
                            </h3>
                            <div className='separator'/>
                            <section className='login__content-form'>
                                <FormRegister />
                            </section>
                            
                            <div className='login__content-footer'>
                                <div className='separator'/>
                                <p>
                                    ¿Ya tienes una cuenta?
                                    <Link to='/' className='highlight link'>¡Inicia sesión!</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
      )
}
