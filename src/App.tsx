/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  const setSelectePostId = (postId : number) => {
    if (selectedPostId === postId) {
      setPostId(0);
    } else {
      setPostId(postId);
    }
  };

  const setSelectedUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = +event.target.value;

    setUserId(selectedUserId);
  };

  return (
    <div className="App">
      <UserSelect selectedUserId={userId} setSelectedUserId={setSelectedUserId} />
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={userId}
            setSelectePostId={setSelectePostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};
