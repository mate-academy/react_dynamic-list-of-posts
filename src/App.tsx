import React, { useState, useEffect } from 'react';
import './App.css';
import { getData } from './api/api';
import { PostList } from './components/PostList';
import { IPost, IUser, IComment } from './helpers/interfaces';

const App = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [filteredValue, setFilteredValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  function UploadData() {
    setIsInitialized(true);
    getData().then(resolve => {
      const [resPosts, resUsers, resComments] = resolve;

      setPosts(resPosts);
      setUsers(resUsers);
      setComments(resComments);
      setFilteredPosts(resPosts);
      setIsLoaded(true);
    });
  }

  useEffect(() => {
    setFilteredPosts(posts.filter(event => event.title.includes(filteredValue)
      || event.body.includes(filteredValue)));
  }, [filteredValue]);

  const ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredValue(event.target.value);
  };

  return (
    <div className="post">
      <div className="post__wrap">
        <input
          className="post__input"
          value={filteredValue}
          disabled={!isLoaded}
          onChange={(event) => ChangeHandler(event)}
        />
      </div>
      {posts.length !== 0 && (
        <PostList
          posts={filteredPosts}
          users={users}
          comments={comments}
        />
      )}
      {!isInitialized && !isLoaded && (
        <button
          className="post__button"
          type="button"
          onClick={UploadData}
        >
          Load
        </button>
      )}
      {(isInitialized && !isLoaded && (
        <p className="post__loader">
          Loading...
        </p>
      ))}
    </div>
  );
};

export default App;
