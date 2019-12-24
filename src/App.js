import React from 'react';
import { fetchPostsAndUsersAndComments } from './apiFetch';
import './App.css';
import PostList from './PostList';

function App() {
  const postsWithUsers = async() => {
    const [posts, users, comments] = await fetchPostsAndUsersAndComments();

    return posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));
  };

  return (
    <div className="App">
      <h1 className="title">Dynamic list of posts</h1>
      <PostList getPosts={postsWithUsers} />
    </div>
  );
}

export default App;
