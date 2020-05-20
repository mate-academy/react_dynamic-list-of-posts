import React, { useState } from 'react';
import './App.css';
import { PostList } from './components/PostList/PostList';

import {
  getUsers,
  getPosts,
  getComments,
  User,
  Post,
  Comment } from './helpers/api';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setCommnets] = useState<Comment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [erroeMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();

      setPosts(postsFromServer);
      setUsers(usersFromServer);
      setCommnets(commentsFromServer);
      setIsLoaded(true);
      setErrorMessage('');
    } catch (exeption) {
      setErrorMessage('Error');
    }
  }

  return (
    <section className="post-list">
      <h1 className="post-list__title">Dynamic list of posts</h1>

      {!isLoaded ? (
      <>
        <button
          type="button"
          onClick={handleClick}
        >
          Load
        </button>
        {erroeMessage && (<p>{erroeMessage}</p>)}
      </>
      ) : (
        <PostList
          posts={posts}
          users={users}
          comments={comments}
        />
      )}
    </section>
  )
}
