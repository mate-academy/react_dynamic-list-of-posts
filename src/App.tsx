import React, { useMemo, useState } from 'react';
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
        comments: commentsFromServer.filter(comment => comment.postId === post.id),
      }));

      setPosts(postsWithUsersAndComments);
    } catch (e) {
      setError('Loading error');
    }

    setLoading(false);
  };

  const filterMovieList = useMemo(() => (
    posts
      .filter(({ title, body }) => (title + body)
        .toLowerCase()
        .includes(query.toLowerCase()))
  ), [query, posts]);

  return (
    <div className="App">
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
        <ul className="postList">
          <input type="text" onChange={event => (setQuery(event.target.value))} />
          {filterMovieList.map(post => (
            <li key={post.id} className="postList__item">
              <p className="post__title">{`${post.id}. ${post.title}`}</p>
              <p className="post__body">{`body: ${post.body}`}</p>
              <p className="user">{`user: ${post.user ? post.user.name : 'Unknown'}`}</p>
              <ul className="comments">
                {post.comments ? post.comments.map(comment => (
                  <li key={comment.id} className="comments__item">
                    <p className="comment__title">{`name: ${comment.name}`}</p>
                    <p>{`body: ${comment.body}`}</p>
                  </li>
                )) : 'Unknown'}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
