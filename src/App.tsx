import React, { FC, useState } from 'react';
import './App.css';

import { PreparedPostType, UserType } from './utils/interfaces';
import { getPosts, getUsers, getComments } from './api/getData';
import { PostList } from './components/PostList/PostList';

const App: FC = () => {
  const [postsList, setPostsList] = useState<PreparedPostType[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<PreparedPostType[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    const postsData = [...posts];
    const combinedData = postsData.map((post) => {
      const author = users.find(person => person.id === post.userId) as UserType;
      const postComments = comments
        .filter(comment => comment.postId === post.id);

      return {
        ...post,
        author,
        postComments,
      };
    });

    setVisiblePosts(combinedData);
    setPostsList(combinedData);
    setLoaded(true);
  };

  const searchPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoResults(false);
    const searchValue = event.target.value.toLowerCase().trim();

    const searchedPosts = [...postsList]
      .filter(post => (post.title + post.body)
        .toLowerCase()
        .trim()
        .includes(searchValue));

    setNoResults(!searchedPosts.length);
    setVisiblePosts(searchedPosts);
  };

  return (
    <div className="app">
      <h1>Static list of posts</h1>
      {!isLoaded
        ? (
          <button
            className="button"
            type="button"
            disabled={isLoading}
            onClick={loadPosts}
          >
            {isLoading ? ('Loading...') : ('Load Posts')}
          </button>
        )
        : (
          <>
            <input
              className="search-bar"
              onInput={searchPosts}
              placeholder="Try &quot;qui est esse&quot;"
            />
            {noResults
              ? (<p>No results! :(</p>)
              : (<PostList postlist={visiblePosts} />)}
          </>
        )}
    </div>
  );
};

export default App;
