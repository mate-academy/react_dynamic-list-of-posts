const BASE_URL = 'https://mate-api.herokuapp.com/';

export const getTodos = async() => {
  const todos = await fetch(`${BASE_URL}posts`);

  return todos.json();
};

export const postDetails = async(id) => {
  const detail = await fetch(`${BASE_URL}posts/${id}`);

  return detail.json();
};
