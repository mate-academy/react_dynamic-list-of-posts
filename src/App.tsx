import React, {
  FC,
  useState,
  ChangeEvent,
  useMemo,
} from 'react';
import { getPrepearedPosts } from './api/api';
import { PostsList } from './components/PostsList/PostsList';
import './App.css';

const App: FC = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setValue] = useState('');


  const loadHandler = () => {
    setLoading(true);
    getPrepearedPosts().then(postsFromServer => {
      setPosts(postsFromServer);
      setLoading(false);
    });
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const filteredPosts = useMemo(() => posts.filter(post => {
    return post.title.toLowerCase().includes(inputValue.trim().toLowerCase())
      || post.body.toLowerCase().includes(inputValue.trim().toLowerCase());
  }), [inputValue, posts]);

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {posts.length
        ? (
          <PostsList
            posts={filteredPosts}
            onChange={changeHandler}
            inputValue={inputValue}
          />
        )
        : (
          <button
            type="button"
            onClick={loadHandler}
            disabled={isLoading}
          >
            {isLoading
              ? 'Loading...'
              : 'Load Posts'}
          </button>
        )}
    </>
  );
};

export default App;
