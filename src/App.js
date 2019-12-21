import React from 'react';
import './App.css';
import { getPosts, getUsers, getComments } from './ArrsApi';
import PostList from './PostList';

const App = () => {
  const modifyPosts = async() => {
    const [posts, users, comments] = await Promise
      .all([getPosts(), getUsers(), getComments()]);

    return posts.map((post) => {
      const currentuser = users.find(user => user.id === post.userId);
      const userComment = comments
        .filter(comment => comment.postId === post.id);

      return {
        ...post,
        name: currentuser.name,
        email: currentuser.email,
        address: currentuser.address,
        comments: userComment,
      };
    });
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      <PostList GetPosts={modifyPosts} />
    </div>
  );
};

export default App;
