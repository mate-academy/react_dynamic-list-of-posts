export const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())


export const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())

export const getComments = () => fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())

