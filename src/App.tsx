import React, { useState, useCallback } from 'react';
import './App.css';
import debounce from 'lodash/debounce';
import { PostList } from './PostList';

import {
  getUsers, getPosts, getComments, Post,
} from './helpers/api';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleLoadClick = async () => {
    setIsLoading(true);

    const usersFromServer = await getUsers();
    const postsFromServer = await getPosts();
    const commentsFromServer = await getComments();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const preparedPosts = postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId),
      comments: commentsFromServer.filter(comment => post.id === comment.postId),
    }));

    setPosts(preparedPosts);
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 1000), [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="header">Dynamic list of posts</h1>
      {posts.length === 0 ? (
        <button className="button" type="button" onClick={handleLoadClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <label htmlFor="search">
            Search:
            <input
              className="input"
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleChange}
            />
          </label>
          {
            posts.filter(post => post.body.includes(filterQuery)).map(post => (
              <PostList post={post} />
            ))
          }
        </>
      )}
    </div>
  );
};

export default App;
