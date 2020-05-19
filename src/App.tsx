import React, {
  FC,
  useState,
  ChangeEvent,
  useMemo,
} from 'react';
import { getPostsData } from './helpers/api';
import { PostsList } from './components/PostsList';
import './App.css';

const App: FC = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const loadHandler = async () => {
    setLoading(true);
    const listOfPosts = await getPostsData();

    setPosts(listOfPosts);
    setLoading(false);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredPosts = useMemo(() => posts.filter(post => {
    return (post.title + post.body).toLowerCase().includes(query.trim().toLowerCase());
  }), [query, posts]);

  return (
    <div className="container">
      <h1 className="heading">Dynamic list of posts</h1>
      {posts.length
        ? (
          <PostsList
            posts={filteredPosts}
            onChange={changeHandler}
            inputValue={query}
          />
        )
        : (
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-start"
              onClick={loadHandler}
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : 'Load Posts'}
            </button>
          </div>
        )}
    </div>
  );
};

export default App;
