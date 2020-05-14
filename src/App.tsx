import React, { useState, useEffect } from 'react';
import './App.scss';
import { getElements } from './api';
import { PostList } from './Components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  function LoadData() {
    setIsInitialized(true);
    getElements().then(resolve => {
      const [tempPosts, tempUsers, TempComments] = resolve;

      setPosts(tempPosts);
      setFilteredPosts(tempPosts);
      setUsers(tempUsers);
      setComments(TempComments);
      setIsLoaded(true);
    });
  }

  function ChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterValue(event.target.value);
  }


  useEffect(() => {
    setFilteredPosts(posts.filter(e => e.title.includes(filterValue)
        || e.body.includes(filterValue)));
  }, [filterValue]);

  return (
    <div className="app">
      <div className="post__input-wrapper">
        <input
          onChange={(event) => ChangeHandler(event)}
          value={filterValue}
          className="post__input"
          disabled={!isLoaded}
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
          type="button"
          onClick={LoadData}
          className="post__btn"
        >
          Load
        </button>
      )}
      {(isInitialized && !isLoaded && (
        <p className="post__load">
          Loading...
        </p>
      ))}
    </div>
  );
};

export default App;
