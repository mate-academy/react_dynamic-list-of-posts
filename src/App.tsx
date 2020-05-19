import React, { useState } from 'react';
import './App.css';
import { postsFromServer } from './API';
import PostList from './components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState<PostWithUserAndComment[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [inputTextField, changeInputTextField] = useState<string>('');

  const fetchData = (): void => {
    setLoading(true);
    postsFromServer.then(data => {
      setLoading(false);

      return setPosts(data.slice(0, 3));
    });
  };

  const postFilter = (searchQuery: string): PostWithUserAndComment[] => {
    if (!searchQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const string = (post.title + post.body).toLowerCase();

      return string.includes(searchQuery);
    });
  };

  return (
    <div className="app">
      <h1>Dynamic list of posts</h1>
      {posts.length > 1
      && (
        <input
          type="text"
          className="app_input"
          value={inputTextField}
          onChange={event => changeInputTextField(event.target.value.toLowerCase())}
        />
      )}
      <PostList posts={postFilter(inputTextField)} />
      {posts.length === 0
      && (
        <button
          type="button"
          className="app__button"
          onClick={() => fetchData()}
        >
          {isLoading ? 'Loading...' : 'Get Posts'}
        </button>
      )}
    </div>
  );
};


export default App;
