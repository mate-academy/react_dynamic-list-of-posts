import React, { FC, useState, useMemo } from 'react';
import { PreparedPost } from './types';
import { getPreparedPosts } from './api_helpers';
import { PostsList } from './components/PostsList/PostsList';
import './App.css';

export const App: FC = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [searchPost, setSearchPost] = useState('');
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
    setSearchPost(search);
  }

  const searchedPost = useMemo(() => posts.filter(
    post => post.title.toLowerCase().includes(searchPost)
    || post.body.toLowerCase().includes(searchPost),
  ), [posts, searchPost]);

  if (isLoading) {
   return (
     <p className="loading">
     Loading...
     </p>
   );
 }
 console.log(posts);

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
                <label htmlFor="search-query" className="label">
                  Search Post
                </label>
                <input
                  type="text"
                  id="search-query"
                  className="search_input"
                  placeholder="Type search word"
                  onChange={filtered}
                />
                <PostsList posts={searchedPost} />
              </>
            )
        )}
      </div>
    )
  };
