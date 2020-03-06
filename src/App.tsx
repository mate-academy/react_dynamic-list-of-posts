import React, { FC, useState } from 'react';
import './App.css';
import { PostsList } from './components/PostsList/PostsList';
import { getPosts, getUsers, getComments } from './utils/api';
import { FullPostType, UserType, CommentType } from './utils/interfaces';

const App: FC = () => {
  const [posts, setPosts] = useState<FullPostType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const showPosts = async () => {
    setLoading(true);

    const [loadedPosts, loadedUsers, loadedComments] = await Promise
      .all([getPosts(), getUsers(), getComments()]);

    const fullPosts = loadedPosts.map((post) => ({
      ...post,
      user: loadedUsers
        .find((person) => person.id === post.userId) as UserType,
      comments: loadedComments
        .filter((comment) => post.id === comment.postId) as CommentType[],
    }));

    setPosts(fullPosts);
    setLoading(false);
  };

  return (
    <>
      {!posts.length
        ? (
          <button
            className="start-button"
            type="button"
            onClick={showPosts}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start load posts'}
          </button>
        )
        : (
          <div className="app">
            <h1>Dynamic list of posts</h1>
            <PostsList posts={posts} />
          </div>
        )}
    </>
  );
};

export default App;
