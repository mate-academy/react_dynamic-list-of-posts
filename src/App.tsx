import React, { useState } from 'react';
import './App.css';
import PostsList from './Components/PostsList';

import {
  getPostsFromServer,
  getCommentsFromServer,
  getUsersFromServer,
} from './helpers/api';

const App: React.FunctionComponent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    const postsFromServer = await getPostsFromServer();
    const commentsFromServer = await getCommentsFromServer();
    const usersFromServer = await getUsersFromServer();

    const preparedPosts = postsFromServer.map((post: Post) => ({
      ...post,
      user: usersFromServer.find((user: User) => user.id === post.userId),
      comments: commentsFromServer.filter((comment: Comment) => comment.postId === post.id),
    }));

    setPosts(preparedPosts);
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {posts.length === 0
        ? (<button type="button" onClick={loadData} disabled={isLoading}>{isLoading ? 'Loading...' : 'Load'}</button>)
        : (

          <PostsList posts={posts} />
        )}


    </div>
  );
};


export default App;
