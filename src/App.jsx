import React, { useState, useEffect } from "react";
import "./App.scss";
import "./styles/general.scss";

import { PostsList } from "./components/PostsList";
import { PostDetails } from "./components/PostDetails";
import { getUsers } from "./api/posts";

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [users, setUsers] = useState([]);

  const handleOpen = (postId) => {
    if (postId) {
      setSelectedPostId(postId);

      return;
    }

    setSelectedPostId("");
  };

  useEffect(() => {
    getUsers().then((usersFromServer) => setUsers(usersFromServer));
  });

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
          >
            <option value="0">All users</option>
            {users.map((user) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList userId={selectedUserId} handleOpen={handleOpen} />
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
