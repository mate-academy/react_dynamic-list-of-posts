import React, { useState } from 'react';
import './App.css';
import getData from './getDataApi';
import PostList from './PostList';

const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

let fullPosts = [];

const getPostsWithUsersAndComments = (allPosts, allUsers, allComments) => (
  allPosts.map((post) => {
    const user = allUsers.find(person => person.id === post.userId);
    const postComments = allComments
      .filter(comment => comment.postId === post.id);

    return {
      ...post,
      user,
      postComments,
    };
  })
);

const App = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const loadPostsWithUsersAndComments = async() => {
    try {
      setError(false);
      setLoading(true);

      const [posts, users, comments] = await Promise
        .all([getData(postsURL), getData(usersURL), getData(commentsURL)]);

      fullPosts = [...getPostsWithUsersAndComments(posts, users, comments)];

      setInitialized(true);
    } catch {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      {!isInitialized && !isLoading && !isError && (
        <button
          type="button"
          className="load load--start"
          onClick={loadPostsWithUsersAndComments}
        >
          Load
        </button>
      )}

      {isLoading && !isError && (<p className="loading-text">Loading...</p>)}

      {isError && (
        <button
          type="button"
          className="load load--start"
          onClick={loadPostsWithUsersAndComments}
        >
          Try again
        </button>
      )}

      {isInitialized && !isLoading && (
        <PostList
          posts={fullPosts}
        />
      )}
    </div>
  );
};

export default App;
