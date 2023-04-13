import { URL_BASE } from '../config';

const getTransactions = async () => {
  const URL = `${URL_BASE}tematica`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };
  return await fetch(URL, options).then((res) => res.json());
};

const getByToken = async (token) => {
  const URL = `${URL_BASE}auth/token`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    mode: 'cors',
  };
  return await fetch(URL, options).then((res) => res.json());
};

const getAllMedia = async (data, token) => {
  const URL = `${URL_BASE}element`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ data }),
    mode: 'cors',
  };
  const resp = await fetch(URL, options).then((res) => res.json());

  return resp.payload;
};

const deleteConcept = async (concept, role, token) => {
  const URL = `${URL_BASE}tematica`;

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({
      concept,
      role,
    }),
    mode: 'cors',
  };
  return await fetch(URL, options).then((res) => res.json());
};

export { getTransactions, getByToken, getAllMedia, deleteConcept };
