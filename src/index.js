import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlComments = 'https://jsonplaceholder.typicode.com/comments';

ReactDOM.render(
  <App urlPosts={urlPosts} urlUsers={urlUsers} urlComments={urlComments} />,
  document.getElementById('root'));
serviceWorker.unregister();
