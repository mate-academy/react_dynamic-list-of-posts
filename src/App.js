import React, { useState } from 'react';
import './App.css';

import { getPosts } from './api/posts';
import { getUsers } from './api/users';
import { getComments } from './api/comments';

import PostList from './PostList';

const App = () => {
  const [isLoaded, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState([]);

  const mergeData = (posts, users, comments) => {
    const data = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    setPostsData(data);
  };

  const loadData = async() => {
    setLoading(true);
    const [posts, users, comments] = await Promise.all(
      [getPosts(), getUsers(), getComments()]
    );

    mergeData(posts, users, comments);
    setLoading(false);
    setLoad(true);
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="App">
      {isLoaded
        ? (
          <PostList
            posts={postsData}
          />
        )
        : (
          <button
            type="button"
            className="post__button"
            onClick={loadData}
          >
            Load
          </button>
        )
      }
    </div>
  );
};

export default App;
