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
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = async () => {
    setIsLoading(true);
    const postsFromServer = await getPostsFromServer();
    const commentsFromServer = await getCommentsFromServer();
    const usersFromServer = await getUsersFromServer();

    const preparedPosts = postsFromServer.map((post: Post) => ({
      ...post,
      user: usersFromServer.find((user: User) => user.id === post.userId),
      comments: commentsFromServer.filter(
        (comment: Comment) => comment.postId === post.id,
      ),
    }));

    setPosts(preparedPosts);
  };

  const filterPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const visiblePosts = (searchingQuery: string, postsList: Post[]) => {
    const normalizedQuery = searchingQuery.toLowerCase();

    return postsList.filter(
      (post: Post) => post.title.toLowerCase().includes(normalizedQuery)
        || post.body.toLowerCase().includes(normalizedQuery),
    );
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {posts.length === 0 ? (
        <button
          type="button"
          onClick={loadData}
          disabled={isLoading}
          className="button"
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <input
            type="text"
            onChange={filterPosts}
            placeholder="search the post"
          />
          <PostsList posts={visiblePosts(searchQuery, posts)} />
        </>
      )}
    </div>
  );
};

export default App;
