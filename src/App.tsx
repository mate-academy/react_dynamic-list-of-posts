import React, { useState } from 'react';
import './App.css';
import { preparePosts } from './helpers';
import { Post } from './components/Interface';
import { Button } from './components/Button';
import { PostList } from './components/PostList';
import { Search } from './components/Search';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPosts = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const preparedPosts = await preparePosts();

      setPosts(preparedPosts);
      setIsLoaded(true);
    } catch {
      setHasError(true);
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
        {!isLoading && !isLoaded && !hasError && (
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
        {hasError && (
          <>
            <div className="notification is-warning">Oops! Something went wrong... :(</div>
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
