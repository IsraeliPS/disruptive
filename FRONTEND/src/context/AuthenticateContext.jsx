import { useState, createContext } from 'react'

const AuthenticateContext = createContext()

const AuthenticateProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({
    logged: false,
    loading: false,
    error: null,
    payload: 0,
    name:''
  })

  const data = { userAuth, setUserAuth }

  return (
    <AuthenticateContext.Provider value={data}>
      {children}
    </AuthenticateContext.Provider>
  )
}

export { AuthenticateProvider }

export default AuthenticateContext