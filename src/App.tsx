import React, { useState } from 'react';
import './App.css';
import { PostsBlock } from './components/PostsBlock';
import { fetchData } from './api/fetchData';
import { API_URL_POSTS, API_URL_USERS, API_URL_COMMENTS } from './api/urls';
import {
  Post, User, Comment, PostExtended,
} from './interfaces/data';

const App: React.FC = () => {
  const [postsExtended, setPostsExtended] = useState<PostExtended[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const loadData = async () => {
    setError(false);
    setLoading(true);

    try {
      const [posts, users, comments] = await Promise.all([
        fetchData<Post>(API_URL_POSTS),
        fetchData<User>(API_URL_USERS),
        fetchData<Comment>(API_URL_COMMENTS),
      ]);

      const preparedPosts: PostExtended[] = posts.map(({
        userId,
        id,
        title,
        body,
      }) => ({
        id,
        title,
        body,
        author: users.find(user => user.id === userId)!,
        comments: comments.filter(({ postId }) => postId === id),
      }));

      setPostsExtended(preparedPosts);

      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <section className="task-wrap">
      <h1>Dynamic list of posts</h1>
      {
        postsExtended.length === 0
          ? (
            <button
              className="init-btn"
              type="button"
              onClick={loadData}
              disabled={isLoading}
            >
              {isLoading && 'Loading...'}
              {hasError && 'Try again!'}
              {!isLoading && !hasError && 'Load'}
            </button>
          )
          : <PostsBlock initialPosts={postsExtended} />
      }
    </section>
  );
};

export default App;
