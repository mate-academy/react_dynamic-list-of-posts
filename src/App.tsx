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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [filterQuery, setFilterQuery] = useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();

      setPosts(postsFromServer);
      setFilteredPosts(postsFromServer);
      setUsers(usersFromServer);
      setCommnets(commentsFromServer);
      setIsLoaded(true);
      setErrorMessage('');
    } catch (exeption) {
      setErrorMessage('Error');
    }

    setIsLoading(false);
  }

  const changeFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value);

    setTimeout(() => {
      setFilteredPosts(posts.filter(({ title, body }) => (title + body)
        .toLowerCase()
        .includes(filterQuery.toLowerCase())));
    }, 1000);
  }

  const resetFilter = () => {
    setFilteredPosts(posts);
    setFilterQuery('');
  }


  return (
    <section className="post-list">
      <h1 className="post-list__title">Dynamic list of posts</h1>

      {!isLoaded ? (
      <>
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? `Loading...` : `Load`}
        </button>
        {errorMessage && (<p>{errorMessage}</p>)}
      </>
      ) : (
        <>
          <div>
            <input
              type="textarea"
              className="post-list__filter"
              value={filterQuery}
              onChange={changeFilterInput}
            />
            <button
              type="button"
              onClick={resetFilter}
            >
              Reset
            </button>
          </div>

          <PostList
            posts={filteredPosts}
            users={users}
            comments={comments}
          />
        </>

      )}
    </section>
  )
}
