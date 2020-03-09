import React, {
  FC, useState, useMemo,
} from 'react';
import './App.css';
import { getPreparedPosts } from './api/utils';
import { PostsList } from './components/PostList/PostList';

export const App: FC = () => {
  const [isLoading, setIsLoadind] = useState(false);
  const [posts, setPosts] = useState<PostsInterface[]>([]);
  const [query, setQuery] = useState('');

  const handleLoadButton = async () => {
    setIsLoadind(true);
    const postsFromServer = await getPreparedPosts();

    setPosts(postsFromServer);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryFrominput = event.target.value;

    setQuery(queryFrominput);
  };

  const filterPostsByQuery = useMemo(() => posts.filter(
    post => post.title.toLowerCase().includes(query)
    || post.body.toLowerCase().includes(query),
  ), [posts, query]);

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {posts.length === 0
        ? (
          <button
            type="button"
            disabled={isLoading}
            className="button"
            onClick={handleLoadButton}
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <>
            <input
              type="text"
              id="search-query"
              className="search_input"
              placeholder="Type search word"
              onChange={handleQuery}
            />
            <PostsList posts={filterPostsByQuery} />
          </>
        )}
    </>
  );
};
