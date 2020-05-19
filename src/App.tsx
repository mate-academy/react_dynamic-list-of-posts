import React, { useState } from 'react';
import './App.css';
// import _ from 'lodash';
import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './helpers/api';
import PostSearch from './components/PostSearch';

function debounce(func: (...args: string[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: string[]): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}


const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoadPosts = () => {
    setIsLoading(true);

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([postsFromServer, usersFromServer, commentsFromServer]) => {
        const preparedPostsList = postsFromServer.map(post => {
          return {
            ...post,
            user: usersFromServer
              .find(user => user.id === post.userId),
            comments: commentsFromServer
              .filter(comment => comment.postId === post.id),
          };
        });

        setPosts(preparedPostsList);
        setIsLoading(false);
        setIsLoaded(true);
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(`Error occur: ${error.message}. Please try again later`);
        setIsLoading(false);
      });
  };

  const searchFilter = debounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  const preparedPostsList = posts.filter(post => {
    if (searchQuery) {
      const regExp = new RegExp(searchQuery);

      return post.title.match(regExp) || post.body.match(regExp);
    }

    return post;
  });

  return (
    <div className="posts">
      {!isLoaded && (
        <button
          className="posts__button"
          type="button"
          onClick={handleLoadPosts}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
      {errorMessage && (
        <div className="posts__error">
          {errorMessage}
        </div>
      )}
      {isLoaded && (
        <>
          <PostSearch searchFilter={searchFilter} posts={preparedPostsList} />
          <PostList posts={preparedPostsList} />
        </>
      )}
    </div>
  );
};

export default App;
