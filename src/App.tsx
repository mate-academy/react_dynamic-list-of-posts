import React, {
  FC, useState, ChangeEvent, useMemo,
} from 'react';
import './App.css';
import { PreparedPosts } from './interfaces';
import { getPostsWithUsersComments } from './api';
import { PostList } from './components/PostList';

const App: FC = () => {
  const [posts, setPosts] = useState<PreparedPosts[]>([]);
  const [originalPosts, setOriginalPosts] = useState<PreparedPosts[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    const postsFromServer = await getPostsWithUsersComments();

    setPosts(postsFromServer);
    setOriginalPosts(postsFromServer);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setQuery(target.value.toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery('');
  };

  useMemo(() => {
    setPosts(originalPosts
      .filter(post => post.title.toLowerCase().includes(query)
        || post.body.toLowerCase().includes(query)));
  }, [query]);


  return (
    <div className="app">
      <h1 className="app__heading">Dynamic list of posts</h1>
      {(originalPosts.length === 0)
        ? (
          <>
            <button
              type="button"
              onClick={loadPosts}
              disabled={isLoading}
            >
          Load posts
            </button>
            {isLoading && (
              <p>Loading...</p>
            )}
          </>
        )
        : (
          <>
            <form onSubmit={handleSubmit}>
              <input
                className="app__input"
                placeholder="Type search word"
                onChange={handleInput}
                type="text"
                value={query}
              />
            </form>
            <PostList posts={posts} />
          </>
        )}
    </div>
  );
};

export default App;
