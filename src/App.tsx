import React, { useState } from 'react';
import './App.css';
import LoadButton from './components/LoadButton';
import { PostList } from './components/PostList';

export const App: React.FC = () => {
  const [praperedList, setPraperedList] = useState<PreparedProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const beforeLoaded = () => {
    setIsLoading(true);
    setIsStarted(true);
  };

  const afterLoaded = (list: PreparedProps[]) => {
    setPraperedList(list);
    setIsLoading(false);
    setIsLoaded(true);
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
          ? <PostList list={praperedList} />
          : <></>
      }
    </div>
  );
};
