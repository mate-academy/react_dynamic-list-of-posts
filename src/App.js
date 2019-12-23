import React, { useState } from 'react';
import './App.css';
import { getUsersResolvedPromise } from './api/usersApi';
import { getPostsResolvedPromise } from './api/postsApi';
import { getCommentsResolvedPromise } from './api/commentsApi';
import PostList from './components/PostList';
import { debounce } from './debounce';

function App() {
  const [originalPostsWithAll, getPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [postsWithAll, getOriginalPosts] = useState([]);

  const getPostsWithUsersAndComments = (postsArr, usersArr, commentsArr) => (
    postsArr.map(post => (
      {
        ...post,
        user: usersArr.find(user => user.id === post.userId),
        comments: commentsArr.filter(comment => comment.postId === post.id),
      }
    ))
  );

  const loadData = async() => {
    setLoading(true);

    const [
      posts,
      users,
      comments,
    ] = await Promise.all([
      await getPostsResolvedPromise(),
      await getUsersResolvedPromise(),
      await getCommentsResolvedPromise(),
    ]);

    getPosts(getPostsWithUsersAndComments(posts, users, comments));
    getOriginalPosts(getPostsWithUsersAndComments(posts, users, comments));
    setLoading(false);
  };

  const searchPosts = (value) => {
    const searchQuery = value.toLowerCase();

    getPosts(
      postsWithAll.filter(
        ({ title, body }) => (
          (title + body).toLowerCase().includes(searchQuery)
        )
      )
    );
  };

  const debounceHandler = debounce(searchPosts, 1000);

  if (originalPostsWithAll.length === 0) {
    return (
      <button
        type="button"
        onClick={() => loadData()}
      >
        {isLoading ? 'Loading...' : 'Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      <p>
        posts found -
        {originalPostsWithAll.length}
      </p>
      <input
        type="search"
        className="input"
        placeholder="Search for posts"
        onChange={e => debounceHandler(e.target.value)}
      />
      <PostList posts={originalPostsWithAll} />
    </div>
  );
}

export default App;
