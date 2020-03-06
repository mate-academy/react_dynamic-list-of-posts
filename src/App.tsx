import React, {
  FC, useState, ChangeEvent, useMemo,
} from 'react';
import './App.css';

import { getUsers, getPosts, getComments } from './utils/api';
import { PostList } from './components/PostList/PostList';


const App: FC = () => {
  const [preparedPosts, setPreparedPosts] = useState<PreparedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleClickLoad = () => {
    setIsLoading(true);

    Promise.all([getUsers(), getPosts(), getComments()])
      .then(([usersFromApi, postsFromApi, commentsFromApi]) => {
        setPreparedPosts(postsFromApi.map(post => ({
          ...post,
          user: usersFromApi.find(user => user.id === post.userId) as User,
          comments: commentsFromApi.filter(comment => post.id === comment.postId) as Comments,
        })));
      })
      .finally(() => setIsLoading(false));
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setQuery(target.value);
  };

  const filteredPosts = useMemo(() => preparedPosts.filter(post => post.title
    .trim()
    .toLowerCase()
    .includes(query.trim().toLowerCase())
      || post.body
        .trim()
        .toLowerCase()
        .includes(query.trim().toLowerCase())),
  [query, preparedPosts]);

  if (!preparedPosts.length) {
    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        <>
          <button
            type="button"
            className="button button-start"
            onClick={handleClickLoad}
            disabled={isLoading}
          >
            Load
          </button>
        </>
        {isLoading && (
          <p className="text">Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      <div className="box">
        <div className="field">
          <label
            htmlFor="search-query"
            className="label"
          >
            Search:&nbsp;
            <input
              type="text"
              id="search-query"
              name="search-query"
              className="input"
              placeholder="Type search word"
              value={query}
              onChange={event => onChangeHandler(event)}
            />
          </label>
        </div>
      </div>
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default App;
