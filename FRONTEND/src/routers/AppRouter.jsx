import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { LoginScreen } from '../pages/LoginScreen'
import { OperationScreen } from '../pages/OperationScreen'
import { RegisterScreen } from '../pages/RegisterScreen'


export const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/*' element={
              <LoginScreen />
          }
        />
        <Route
          path='/register' element={
              <RegisterScreen />
          }
        />
        
        <Route
          path='/operation' element={
            <OperationScreen />
        }
        />
      </Routes>
    </BrowserRouter>
  )
}