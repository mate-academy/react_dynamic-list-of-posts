import React, { FC, useState } from 'react';
import { PostsList } from './PostsList/PostsList';
import { getPosts, getUsers, getComments } from './api';

import './App.css';

import {
  PostWithUser,
  User,
  Comment,
} from './types';

const App: FC = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setLoading] = useState(false);

  const showPosts = async () => {
    setLoading(true);

    const [
      loadedPosts,
      loadedUsers,
      loadedComments,
    ] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    const allPosts = loadedPosts.map((post) => ({
      ...post,
      user: loadedUsers
        .find((person) => (
          person.id === post.userId
        )) as User,
      comments: loadedComments
        .filter((comment) => (
          post.id === comment.postId
        )) as Comment[],
    }));

    setPosts(allPosts);
    setLoading(false);
  };

  return (
    <>
      {!posts.length
        ? (
          <button
            type="button"
            onClick={showPosts}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Press to LOAD'}
          </button>
        )
        : (
          <div className="app">
            <PostsList posts={posts} />
          </div>
        )}
    </>
  );
};

export default App;
