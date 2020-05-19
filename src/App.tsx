import React, { useState, useMemo } from 'react';
import { PostList } from './PostList';

import { getFullList } from './api';
import './App.scss';

const App = () => {
  const [posts, setPosts] = useState<FullPostList[]>([]);
  const [filterPage, setFilterPage] = useState<string>('');
  const [isButtonVisible, setButtonVisible] = useState<boolean>(true);
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<boolean>(false);

  const getNewPosts = () => {
    setDataLoaded(true);
    setButtonVisible(!isButtonVisible);
    getFullList().then(data => {
      setPosts(data);
      setDataLoaded(false);
      setTextInput(true);
    });
  };

  const changedInput = (e: { target: { value: string } }) => {
    const target = e.target.value;

    setFilterPage(target);
  };

  const visiblePosts = useMemo(() => {
    return posts.filter(item => {
      const str = (item.title + item.body).toLowerCase();

      return (
        str.includes(filterPage.toLowerCase())
      );
    });
  }, [posts, filterPage]);

  return (
    <>
      {
        isDataLoaded
        && <h1>Loading...</h1>
      }

      {
        isButtonVisible
        && (
          <button
            type="button"
            onClick={getNewPosts}
          >
            Load new posts
          </button>
        )
      }

      {
        textInput
        && (
          <input
            type="text"
            onChange={changedInput}
            value={filterPage}
          />
        )
      }

      {
        !!visiblePosts.length
        && <PostList postList={visiblePosts} />
      }
    </>
  );
};

export default App;
