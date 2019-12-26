import React, { useState } from 'react';
import './App.css';
import { getComments, getPosts, getUsers } from './Api';
import PostList from './PostList';
import { debounce } from './Debounce';

function App() {
  const [postsWithUsers, setPostsWithUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const loadData = async() => {
    setLoading(!isLoading);

    const [
      posts,
      users,
      comments,
    ] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    setPostsWithUsers(posts.map(
      post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments
          .filter(comment => comment.postId === post.id),
      })
    ));
  };

  const searchPosts = (value) => {
    const searchQuery = value.toLowerCase();

    getPosts(
      setSearchItem.filter(
        ({ title, body }) => (
          (title + body).toLowerCase().includes(searchQuery)
        )
      )
    );
  };

  const debounceHandler = debounce(searchPosts, 500);

  const filteredItems = () => ([...postsWithUsers]
    .filter(post => (post.title + post.body)
      .toLowerCase().includes(searchItem)));

  const postsToBeShown = searchItem ? filteredItems() : [...postsWithUsers];

  return (
    <div className="App">
      <h1 className="title">Dynamic List of Posts</h1>
      {postsWithUsers.length > 0 ? (
        <>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for posts"
            onChange={e => debounceHandler(e.target.value)}
          />
          <PostList posts={postsToBeShown} />
        </>
      ) : (
        <button
          className="button"
          type="button"
          onClick={loadData}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
}

export default App;
