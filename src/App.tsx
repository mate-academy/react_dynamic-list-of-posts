import React, { useState } from 'react';
import './App.css';
import {
  getComments,
  getPosts,
  getUsers,
  Post,
} from './api';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState<string>('');

  const handleLoadClick = async () => {
    setLoading(true);

    try {
      const postsFromServer = await getPosts();
      const commentsFromServer = await getComments();
      const usersFromServer = await getUsers();

      const postsWithUsersAndComments: Post[] = postsFromServer.map(post => ({
        ...post,
        user: usersFromServer.find(user => user.id === post.userId),
        comment: commentsFromServer.filter(comment => comment.postId === post.id),
      }));

      setPosts(postsWithUsersAndComments);
    } catch (e) {
      setError('Loading error');
    }

    setLoading(false);
  };

  const filterMovieList = posts
    .filter(({ title, body }) => (title + body)
      .toLowerCase()
      .includes(query.toLowerCase()));

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {!posts.length ? (
        <>
          <button type="button" onClick={handleLoadClick} disabled={loading}>
            {loading ? 'Loading...' : 'load'}
          </button>
          {error && (
            <>
              <span>{error}</span>
              <button type="button" onClick={handleLoadClick} disabled={loading}>
                try again
              </button>
            </>
          )}
        </>
      ) : (
        <ul>
          <input type="text" onChange={event => (setQuery(event.target.value))} />
          {filterMovieList.map(post => (
            <li key={post.id}>
              <p>{`${post.id}. ${post.title}`}</p>
              <p>{`body: ${post.body}`}</p>
              <p>{`user: ${post.user ? post.user.name : 'Unknown'}`}</p>
              <ul>
                {post.comment ? post.comment.map(comment => (
                  <li key={comment.id}>
                    <p>{`name: ${comment.name}`}</p>
                    <p>{`body: ${comment.body}`}</p>
                  </li>
                )) : 'Unknown'}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
