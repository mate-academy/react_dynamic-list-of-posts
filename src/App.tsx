import React, { FC, useState } from 'react';
import { PostsList } from './PostsList/PostsList';
import { getPosts, getUsers, getComments } from './api';

import './App.css';

import {
  AllPostProps,
  PostProps,
  UserProps,
  CommentProps,
} from './types';

const App: FC = () => {
  const [postedList, setPosts] = useState<AllPostProps[]>([]);
  const [isLoading, setLoading] = useState(false);

  const showPosts = async () => {
    setLoading(true);

    const [loadedPosts, loadedUsers, loadedComments] = await Promise
      .all([getPosts(), getUsers(), getComments()]);

    const allPosts = loadedPosts.map((post: PostProps) => ({
      ...post,
      user: loadedUsers
        .find((person: UserProps) => (
          person.id === post.userId
        )) as UserProps,
      comments: loadedComments
        .filter((comment: CommentProps) => (
          post.id === comment.postId
        )) as CommentProps[],
    }));

    setPosts(allPosts);
    setLoading(false);
  };

  return (
    <>
      {!postedList.length
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
            <PostsList posts={postedList} />
          </div>
        )}
    </>
  );
};

export default App;
