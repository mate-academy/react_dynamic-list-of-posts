const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = (URL, defaultData) => fetch(URL)
  .then(response => (response.ok ? response.json() : defaultData))
  .catch(() => defaultData);

export const getPosts = () => getData(`${API_URL}posts`, []);

export const getUsers = () => getData(`${API_URL}users`, []);

export const getComments = () => getData(`${API_URL}comments`, []);
