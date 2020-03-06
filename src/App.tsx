import React, { FC, useState, useMemo } from 'react';
import { PreparedPost } from './types';
import { getPreparedPosts } from './api_helpers';
import { PostsList } from './components/PostsList/PostsList';
import { SearchPost } from './components/SearchPost/SearchPost';
import './App.css';

export const App: FC = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showedAllPosts = async () => {
    setIsLoading(true);

    const postsFromApi = await getPreparedPosts();

    setPosts(postsFromApi);
    setIsLoading(false);
    setIsLoaded(true);
  }

  const filtered = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: search } = event.target;
    setSearchValue(search);
  }

  const searchedPost = useMemo(() => posts.filter(
    post => post.title.toLowerCase().includes(searchValue)
    || post.body.toLowerCase().includes(searchValue),
  ), [posts, searchValue]);

  if (isLoading) {
   return (
     <p className="loading">
     Loading...
     </p>
   );
 }

  return (
    <div className="wrapper">
    <h1>Dynamic list of posts</h1>
    {(
        !isLoaded
          ? (
            <>
              <p className="initual_loading">
                Load posts
              </p>
              <button
                type="button"
                className="loading_button"
                onClick={showedAllPosts}
              >
                Load
              </button>
            </>
           )
          : (
              <>
                <SearchPost
                  searchValue={searchValue}
                  filtered={filtered}
                />
                <PostsList posts={searchedPost} />
              </>
            )
        )}
      </div>
    )
  };
