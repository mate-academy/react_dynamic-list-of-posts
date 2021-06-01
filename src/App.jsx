import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getPostDetails, getPosts } from './api/posts';
import { removeComment, getPostComments } from './api/comments';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setSelectedPost] = useState(0);
  const [details, setDetails] = useState(false);
  const [comments, setComents] = useState([]);

  useEffect(() => {
    getPosts()
      .then(postsFromServer => setPosts(postsFromServer));
  }, []);

  useEffect(() => {
    getPostDetails(selectedPost)
      .then(setDetails);
  }, [selectedPost]);

  useEffect(() => {
    getPostComments(selectedPost)
      .then(setComents);
  }, [selectedPost]);

  const remove = (id) => {
    removeComment(id)
      .then(() => getPostComments(selectedPost))
      .then(setComents);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={e => setSelectedUser(+e.target.value)}
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
            posts={posts}
            selectPost={selectedPost}
            setSelectedPost={setSelectedPost}
            selectedUser={selectedUser}
          />
        </div>

        <div className="App__content">
          {(selectedPost > 0 && details) && (
          <PostDetails
            details={details}
            postId={selectedPost}
            remove={remove}
            comments={comments}
            setComents={setComents}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
