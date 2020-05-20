import React, { useState, useMemo } from 'react';
import './App.css';
import {
  getUsers,
  getPosts,
  getComents,
  Posts,
} from './helpers/api';
import PostList from './components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const usersFromServer = await getUsers();
      const postsFromServer = await getPosts();
      const commentsFromServer = await getComents();

      const postsWithUsersAndComments = postsFromServer.map(post => ({
        ...post,
        user: usersFromServer.find(user => user.id === post.userId),
        comments: commentsFromServer.filter(comment => comment.postId === post.id),
      }));

      setPosts(postsWithUsersAndComments);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage('Loading error, please try again later.');
    }
  };

  const visiblePosts = useMemo(() => {
    const postsFromFilter = (postsItem: Posts[], queryItem: string) => {
      return postsItem
        .filter(post => post.title.includes(queryItem) || post.body.includes(queryItem));
    };

    return postsFromFilter(posts, query);
  }, [posts, query]);

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {!isLoaded ? (
        <>
          <button
            type="button"
            onClick={handleLoadClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
          <p className="error">{errorMessage}</p>
        </>
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
            />
          </div>
          {visiblePosts.length > 0 ? (
            <PostList list={visiblePosts} />
          ) : (
            <h2>Not found.</h2>
          )}
        </>
      )}
    </>
  );
};

export default App;
