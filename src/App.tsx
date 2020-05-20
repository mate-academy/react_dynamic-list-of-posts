import React, { useState, ChangeEvent, useMemo } from 'react';
import './App.css';
import {
  getPosts, getUsers, getComments, Post,
} from './Helpers/api';
import { PostList } from './Components/PostList/PostList';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPosts = async () => {
    setLoading(true);

    try {
      const postsFromServer = await getPosts();
      const usersFromServer = await getUsers();
      const commentsFromServer = await getComments();

      const preparedPosts = postsFromServer.map(post => ({
        ...post,
        user: usersFromServer.find(user => user.id === post.userId),
        comments: commentsFromServer.filter(comment => comment.postId === post.userId),
      }));

      setPosts(preparedPosts);
      setIsLoaded(true);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;

    setInput(value);
  };

  const visiblePosts = useMemo(
    () => {
      return [...posts].filter(post => (
        post.title.toLowerCase().includes(input.toLowerCase())));
    }, [posts, input],
  );

  return (
    <>
      {!isLoaded ? (
        <>
          <button type="button" onClick={loadPosts} disabled={loading}>
            {!loading ? 'Load' : 'Loading'}
          </button>
          <p>{isError && 'Please reload the page'}</p>
        </>
      ) : (
        <>
          <input type="text" value={input} onChange={(event) => handleInput(event)} />
          <PostList posts={visiblePosts} />
        </>
      )}
    </>
  );
};

export default App;
