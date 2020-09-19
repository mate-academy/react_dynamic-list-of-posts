import React, {useState, useEffect} from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { selectedPostId, getPostDetails } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [postDetails, setPostDetails] = useState([]);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    selectedPostId(selectedUser)
      .then(setPosts);

  }, [selectedUser])

  async function viewPostUser(id) {
    const result = await getPostDetails(id);
      setPostDetails(() => result);
  }

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(e) => {setSelectedUser(e.target.value)}}
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
            viewPostUser={viewPostUser}
            posts={posts}
            postDetails={postDetails}
            selectedUser={selectedUser}
            setPostDetails={setPostDetails}
            postId={postId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
           postDetails={postDetails}
           postId={postId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
