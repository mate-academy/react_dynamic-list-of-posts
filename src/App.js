import React, { useState } from 'react';
import './App.css';

import { getPosts } from './api/posts';
import { getUsers } from './api/users';
import { getComments } from './api/comments';

import PostList from './PostList';

let preparedPosts = [];

const getPostsWithUsersAndComments = (PostsList, UsersList, CommentsArr) => (
  PostsList.map((post) => {
    const user = UsersList.find(person => person.id === post.userId);
    const commentList = CommentsArr
      .filter(comment => comment.postId === post.id);

    return {
      ...post,
      user,
      commentList,
    };
  })
);

const App = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const loadPostsWithUsersAndComments = async() => {
    try {
      setError(false);
      setLoading(true);

      const [posts, users, comments] = await Promise
        .all([getPosts(), getUsers(), getComments()]);

      preparedPosts = getPostsWithUsersAndComments(posts, users, comments);
      setInitialized(true);
    } catch {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <>
      {!isInitialized && !isLoading && !hasError && (
        <button
          type="button"
          className="btnLoad"
          onClick={loadPostsWithUsersAndComments}
        >
          Load
        </button>
      )}
      <div className="App">
        {isLoading && !hasError && (
          <div className="hoja">Loading...</div>
        )}

        {hasError && (
          <button
            className="btnError"
            type="button"
            onClick={loadPostsWithUsersAndComments}
          >
            Error...Try again
          </button>
        )}

        {isInitialized && !isLoading && (
          <PostList posts={preparedPosts} />
        )}
      </div>
    </>
  );
};

export default App;
