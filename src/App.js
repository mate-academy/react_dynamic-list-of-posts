import React, { useState } from 'react';
import './App.css';
import { getUsersResolvedPromise } from './api/usersApi';
import { getPostsResolvedPromise } from './api/postsApi';
import { getCommentsResolvedPromise } from './api/commentsApi';
import PostList from './components/PostList';

function App() {
  const [postsWithAll, getPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const loadData = async() => {
    setLoading(true);
    const posts = await getPostsResolvedPromise();
    const users = await getUsersResolvedPromise();
    const comments = await getCommentsResolvedPromise();

    const getPostsWithUsersAndComments = (postsArr, usersArr, commentsArr) => (
      postsArr.map(post => (
        {
          ...post,
          user: usersArr.find(user => user.id === post.userId),
          comments: commentsArr.filter(comment => comment.postId === post.id),
        }
      ))
    );

    getPosts(getPostsWithUsersAndComments(posts, users, comments));
    setLoading(false);
  };

  if (postsWithAll.length === 0) {
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
      <PostList posts={postsWithAll} />
    </div>
  );
}

export default App;
