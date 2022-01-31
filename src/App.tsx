import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails } from './api/posts';
import { getComments } from './api/comments';

const App: React.FC = () => {
  const [userId, setUserId] = useState('0');
  const [selectedPostId, setPostId] = useState(0);
  const [postDetails, setPostDetails] = useState(null);
  const [comments, setComments] = useState(null);

  const selectPost = (postId: number) => {
    setPostId(postId);
  };

  const getDetails = (id: number) => {
    getPostDetails(id).then(details => {
      setPostDetails(details);
    });
  };

  const getCommentsFromServer = (commentsId: number) => {
    getComments(commentsId).then(commentsList => {
      setComments(commentsList);
    });
  };

  const removeDetails = () => {
    setPostDetails(null);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-select"
            value={userId}
            onChange={(event) => {
              setUserId(event.target.value);
            }}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={userId}
            selectPost={selectPost}
            selectedPostId={selectedPostId}
            getDetails={getDetails}
            removeDetails={removeDetails}
          />
        </div>

        <div className="App__content">
          {postDetails
            && (
              <PostDetails
                postDetails={postDetails}
                selectedPostId={selectedPostId}
                getCommentsFromServer={getCommentsFromServer}
                comments={comments}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
