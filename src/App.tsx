import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getAllPosts, getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [users, setUsers] = useState([] as User[]);
  const [posts, setPosts] = useState([] as Post[]);
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [selectedPostID, setSelectedPostID] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(+event.target.value);
  };

  const changePostId = (postId: number) => {
    setSelectedPostID(postId);
  };

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
  }, []);

  useEffect(() => {
    setLoader(false);

    if (selectedUserID === 0) {
      getAllPosts()
        .then(response => {
          setPosts(response);
          setLoader(true);
        });
    } else {
      setPosts([] as Post[]);
      getUserPosts(selectedUserID)
        .then(response => {
          setPosts(response);
          setLoader(true);
        });
    }
  }, [selectedUserID]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleUserChange}
          >
            <option value={0}>All users</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {loader ? (
            <>
              {posts.length !== 0
                ? (
                  <PostsList
                    changePostId={changePostId}
                    selectedPostId={selectedPostID}
                    posts={posts}
                  />
                )
                : <h2>User don`t have any posts yet</h2>}
            </>
          )
            : <Loader />}

        </div>

        {selectedPostID !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostID} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
