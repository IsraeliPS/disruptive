import { URL_BASE } from '../config'

async function createAccount (data) {
    const URL = `${URL_BASE}user`
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }
    const res = await fetch(URL, options)
  return await res.json()
  }

  async function login (credentials) {
    const URL = `${URL_BASE}auth`
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }
    const res = await fetch(URL, options)
    return await res.json()
  }

  async function getTransactionsById (id) {
    const URL = `${URL_BASE}user/${id}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }
    const res = await fetch(URL, options)
    return await res.json()
  }

  export {
    createAccount,
    login,
    getTransactionsById
  }
