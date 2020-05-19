import React, { useState, useMemo } from 'react';
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
  const [hasError, handleErrorStatus] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
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
    } catch {
      handleErrorStatus(true);
      setIsLoading(false);
    }
  };

  const filterPosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const getVisiblePosts = (searchingQuery: string, postsList: Post[]) => {
    const normalizedQuery = searchingQuery.toLowerCase();

    return postsList.filter(
      (post: Post) => (post.title + post.body).toLowerCase().includes(normalizedQuery),
    );
  };

  const visiblePosts = useMemo(() => getVisiblePosts(searchQuery, posts),
    [searchQuery, posts]);

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {hasError && <h2>Some error appeared, please try again</h2>}
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
          <PostsList posts={visiblePosts} />
        </>
      )}
    </div>
  );
};

export default App;
