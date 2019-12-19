import React, { useState } from 'react';
import PostList from './PostList';
import './App.scss';
import { getCommentsFromServer } from './api/comments';
import { getUsersFromServer } from './api/users';
import { getPostsFromServer } from './api/posts';

const App = () => {
  const [posts, savePosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isInitialized, setInit] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const loadList = async() => {
    setLoading(true);

    try {
      const usersFromServer = await getUsersFromServer();
      const postsFromServer = await getPostsFromServer();
      const commentsFromServer = await getCommentsFromServer();

      const preparedPosts = postsFromServer.map((post) => {
        const user = usersFromServer.find(person => person.id === post.userId);
        const commentList = commentsFromServer
          .filter(comment => comment.postId === post.id);

        return {
          ...post, user, commentList,
        };
      });

      savePosts(preparedPosts);
      setInit(true);
    } catch {
      setLoading(false);
      setLoadingError(true);
    }
  };

  const inputHandler = event => (
    setInputValue(event.target.value.replace(/^\s+/, ''))
  );

  const visiblePosts = posts
    .filter(({ title, body }) => {
      const input = inputValue.toLowerCase();

      return title.toLowerCase().includes(input)
        || body.toLowerCase().includes(input);
    });

  if (loadingError) {
    return <p className="error-message">Oops, something went wrong!</p>;
  }

  return (
    <div className="App">
      {!isInitialized ? (
        <>
          <button
            className="button"
            type="button"
            onClick={loadList}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </>
      )
        : (
          <>
            <div className="top">
              <h1 className="table__heading">Dynamic list of posts</h1>
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={inputHandler}
                value={inputValue}
              />
            </div>
            <PostList posts={visiblePosts} highlight={inputValue} />
          </>
        )
      }
    </div>
  );
};

export default App;
