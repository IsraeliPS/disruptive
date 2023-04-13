export const setToken = (token,id) => {
  window.sessionStorage.setItem('authToken', token);
  
};

export const getToken = () => {
  return window.sessionStorage.getItem('authToken');
};

export const deleteToken = () => {
  window.sessionStorage.removeItem('authToken');
};


