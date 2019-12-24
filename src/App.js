import React, { useState } from 'react';
import getPosts from './api/postsApi';
import getUsers from './api/usersApi';
import getComments from './api/CommentsApi';
import PostList from './Components/PostList/PostList';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const loadData = async() => {
    setLoading(true);
    const [
      postsFromServer,
      usersFromServer,
      commentsFromServer,
    ] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    setPosts(postsFromServer.map(post => (
      {
        ...post,
        user: usersFromServer.find(singleUser => singleUser.id === post.userId),
        comments: commentsFromServer
          .filter(comment => comment.postId === post.id),
      })));
    setIsStarted(true);
  };

  const searchPost = (event) => {
    setValue(event.target.value);
  };

  const results = !value
    ? posts
    : posts.filter(post => (post.title.toLowerCase()
      .includes(value.toLocaleLowerCase()) || post.body.toLowerCase()
      .includes(value.toLocaleLowerCase())));

  return (
    isStarted
      ? (
        <section>

          <div className="container">
            <input
              className="ui input"
              type="text"
              placeholder="Search..."
              value={value}
              onChange={searchPost}
            />
          </div>
          <PostList list={results} />
        </section>

      ) : (
        <button
          onClick={loadData}
          type="button"
          className="glow-on-hover"
        >
          {loading ? 'Loading...' : 'Click me'}
        </button>
      )
  );
};

export default App;
