const BASE_URL = 'https://mate-api.herokuapp.com/';

export const getTodos = async(userId) => {
  const todos = await fetch(`${BASE_URL}posts`);
  const response = await todos.json();

  return response.data.filter(todo => ((+userId === 0)
    ? todo
    : todo.userId === +userId));
};

export const postDetails = async(id) => {
  const detail = await fetch(`${BASE_URL}posts/${id}`);

  return detail.json();
};
