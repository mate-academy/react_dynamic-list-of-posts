import React, { useState } from 'react';
import './App.css';
import LoadButton from './components/LoadButton';
import { PostList } from './components/PostList';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [posts, setPosts] = useState<PreparedProps[]>([]);
  const [filterPosts, setFilterPosts] = useState<PreparedProps[]>([]);

  const beforeLoaded = () => {
    setIsLoading(true);
    setIsStarted(true);
  };

  const afterLoaded = (list: PreparedProps[]) => {
    setPosts(list);
    setFilterPosts(list);
    setIsLoading(false);
    setIsLoaded(true);
  };

  const inputHandler = (event: { target: { value: string }}) => {
    const { value } = event.target;

    setFilterPosts(
      [...posts].filter(post => (
        post.title.toLowerCase().includes(value.toLowerCase())
      || post.body.toLowerCase().includes(value.toLowerCase()))),
    );
  };

  return (
    <div className="App">
      {!isStarted
        ? (
          <LoadButton
            beforeLoaded={beforeLoaded}
            afterLoaded={afterLoaded}
          />
        )
        : <></>}

      {
        isLoading
          ? <span className="button__text">Loading...</span>
          : <></>
      }
      {
        isLoaded
          ? (
            <>
              <input
                onChange={inputHandler}
                placeholder="search..."
                type="text"/>
              <PostList list={filterPosts} />
            </>
          )
          : <></>
      }
    </div>
  );
};
