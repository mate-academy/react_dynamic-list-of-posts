import React, { useState } from 'react';
import './App.css';
import PostList from './components/PostList';

import { getComments, getPosts, getUsers } from './helpers/api';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadClick = async () => {
    setLoading(true);

    const commentsFromServer = await getComments();
    const usersFromServer = await getUsers();
    const postsFromServer = await getPosts();

    const postsWithUsersAndComments = postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId),
      comments: commentsFromServer.filter(comment => post.id === comment.postId),
    }));

    setPosts(postsWithUsersAndComments);
  };

  return (
    <div className="wrapper">
      <h1>Dynamic list of posts</h1>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <button type="button" onClick={handleLoadClick} disabled={loading}>
          {loading ? 'Loading...' : 'Load posts'}
        </button>
      )}
    </div>
  );
};

export default App;
