const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => fetch(`${BASE_URL}/posts`).then(response => response.json());

export const getUsers = () => fetch(`${BASE_URL}/users`).then(response => response.json());

export const getComments = () => fetch(`${BASE_URL}/comments`).then(response => response.json());
