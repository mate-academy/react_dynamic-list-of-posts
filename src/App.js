import React, { useState } from 'react';

import './App.css';
import getData from './api/getData';
import PostList from './components/PostList';

const App = () => {
  const postsURL = 'https://jsonplaceholder.typicode.com/posts';
  const usersURL = 'https://jsonplaceholder.typicode.com/users';
  const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const [postsList, setPostsList] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  const loadPosts = async() => {
    setLoading(true);
    const [posts, users, comments] = await Promise.all(
      [getData(postsURL), getData(usersURL), getData(commentsURL)]
    ).finally(() => setLoaded(true));

    const postsArr = [...posts];
    const combinedData = postsArr.map((post) => {
      const author = users.find(person => person.id === post.userId);
      const postComments = comments
        .filter(comment => comment.postId === post.id);

      return {
        ...post, author, postComments,
      };
    });

    setVisiblePosts(combinedData);
    setPostsList(combinedData);
    setLoading(false);
  };

  const searchPosts = (event) => {
    const searchValue = event.target.value.toLowerCase().trim();

    const searchedPosts = [...postsList]
      .filter(post => (post.title + post.title).toLowerCase().trim()
        .includes(searchValue));

    setVisiblePosts(searchedPosts);
  };

  return (
    <div className="App">
      <h1>Static list of posts</h1>
      {!isLoaded
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={loadPosts}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : (<>Load Posts</>)}
          </button>
        )
        : (
          <>
            <input
              className="search-bar"
              onInput={searchPosts}
              placeholder="Try &quot;alias odio sit&quot;"
            />
            <div className="post__list">
              <PostList posts={visiblePosts} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
