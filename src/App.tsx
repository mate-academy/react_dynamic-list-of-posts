import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { getUserPosts, getPostDetails } from './api/posts';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [postDetails, setPostDetails] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(postsReceived => {
        setPosts(postsReceived);
      });
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId !== 0) {
      getPostDetails(selectedPostId)
        .then(detailsReceived => {
          setPostDetails(detailsReceived);
        });
    }
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          selectedUserId={selectedUserId}
          selectUser={(receivedId) => {
            setSelectedUserId(receivedId);
          }}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            selectPost={(postId) => {
              setSelectedPostId(postId);
            }}
          />
        </div>

        <div className="App__content">
          {!selectedPostId
            ? <h2>No opened details</h2>
            : <PostDetails postDetails={postDetails as Post} selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
