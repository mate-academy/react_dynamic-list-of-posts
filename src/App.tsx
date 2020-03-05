import React, { FC, useState } from 'react';
import './App.css';
import { getUsers, getComments, getPosts } from './api';
import { PostsList } from './components/PostsList/PostsList';

export const App: FC = () => {
  const [findQuery, setFindQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PreparedPost[]>([]);

  const loadPosts = async () => {
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

    setPosts(loadedPosts.map((post: { userId: number; id: number }) => ({
      ...post,
      user: loadedUsers.find((user: { id: number }) => user.id === post.userId) as User,
      comments: loadedComments.filter((comment: { postId: number }) => comment.postId === post.id),
    })));

    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFindQuery(event.target.value);
  };

  const filteredPost = posts.filter(post => (
    post.title.toLowerCase().includes(findQuery)
    || post.body.toLowerCase().includes(findQuery)
  ));

  if (posts.length === 0) {
    return (
      <>
        <button
          type="button"
          className="app__load-btn"
          onClick={loadPosts}
          disabled={isLoading}
        >
          Load Posts
        </button>
        {isLoading && (
          <div className="app__loader loader">
            <img
              className="loader__gif"
              src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
              alt="Loading..."
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="post-finder">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Find post by body ot title"
        />
      </div>
      <PostsList
        posts={filteredPost}
      />
    </>
  );
};
