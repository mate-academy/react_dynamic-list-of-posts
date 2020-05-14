import React, { useState } from 'react';
import './App.css';
import { preparePosts } from './helpers';
import { Button } from './components/Button';
import { PostList } from './components/PostList';
import { Search } from './components/Search';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const loadPosts = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      setPosts(await preparePosts());
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const searchPosts = () => {
    if (!searchQuery) {
      return posts;
    }

    return posts.filter((post: Post) => (`${post.title} ${post.body}`)
      .replace(/\s*/g, ' ')
      .includes(searchQuery.replace(/\s*/g, ' ')));
  };

  const searchedPosts = searchPosts();

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">Dynamic List of Posts</h1>
        {!isLoading && !isLoaded && !errorMessage && (
          <Button
            text="Load Posts"
            className="button"
            handleClick={loadPosts}
          />
        )}
        {isLoading && (
          <progress className="progress is-primary" max="100">
            Loading...
          </progress>
        )}
        {errorMessage && (
          <>
            <div className="notification is-warning">
              <p>Oops! Something went wrong... :(</p>
              <p>{errorMessage}</p>
            </div>
            <Button
              text="Try Again"
              className="button"
              handleClick={loadPosts}
            />
          </>
        )}
        {isLoaded && (
          <>
            <Search setSearchQuery={setSearchQuery} />
            <PostList posts={searchedPosts} />
          </>
        )}
        {isLoaded && !searchedPosts.length && (
          <div className="notification is-warning">Posts not found....</div>
        )}
      </div>
    </section>
  );
};

export default App;
