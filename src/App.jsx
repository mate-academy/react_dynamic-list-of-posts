import React, { useState } from 'react';

import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getPostDetails } from './api/posts';
import {
  getPostComments,
  addPostComments,
  deletePostComments,
} from './api/comments';

const App = () => {
  const [userSelect, setUserSelect] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostDetails, setSelectedPostDetails] = useState(null);
  const [postComments, setPostComments] = useState([]);

  const loadPostDetails = async(id) => {
    const [postDetails, comments] = await Promise.all(
      [getPostDetails(id), getPostComments(id)],
    );

    setSelectedPostDetails(postDetails);
    setPostComments(comments);
  };

  const addComment = async(newComment) => {
    const comment = await addPostComments(newComment);

    setPostComments(prevState => [...prevState, comment.data]);
  };

  const deleteComment = async(commentId) => {
    await deletePostComments(commentId);

    setPostComments(prevState => prevState
      .filter(item => item.id !== commentId));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setUserSelect(event.target.value);
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
            getUserPosts={getUserPosts}
            userSelect={userSelect}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            loadPostDetails={loadPostDetails}
          />
        </div>

        <div className="App__content">
          {
            selectedPostDetails && selectedPostId
            && (
              <PostDetails
                selectedPostId={selectedPostId}
                getPostDetails={getPostDetails}
                selectedPostDetails={selectedPostDetails}
                postComments={postComments}
                addComment={addComment}
                deleteComment={deleteComment}
              />
            )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
