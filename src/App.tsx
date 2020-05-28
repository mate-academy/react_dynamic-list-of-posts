import React, { useMemo, useState } from 'react';
import './App.css';
import PostList from './components/PostList';

import { getComments, getPosts, getUsers } from './helpers/api';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, steInputValue] = useState<string>('');

  const handleLoadClick = async () => {
    setLoading(true);

    const commentsFromServer = await getComments();
    const usersFromServer = await getUsers();
    const postsFromServer = await getPosts();

    const postsWithUsersAndComments = postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId),
      comments: commentsFromServer.filter(comment => post.id === comment.postId),
    }));

    setPosts(postsWithUsersAndComments);
  };


  const foundPosts = useMemo(() => (searchQuery: string): Post[] => {
    return posts.filter((post) => {
      const string = (`${post.title} ${post.body}`).toLowerCase();

      return string.includes(searchQuery);
    });
  }, [posts, inputValue]);

  return (
    <div className="wrapper">
      <h1 className="title">Dynamic list of posts</h1>

      {posts.length > 0 ? (
        <div className="wrapper">
          <input
            type="text"
            className="input"
            value={inputValue}
            onChange={event => steInputValue(event.target.value.toLowerCase())}
          />

          <PostList posts={foundPosts(inputValue)} />
        </div>
      ) : (
        <button
          type="button"
          className="button__loading"
          onClick={handleLoadClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load posts'}
        </button>
      )}
    </div>
  );
};

export default App;
