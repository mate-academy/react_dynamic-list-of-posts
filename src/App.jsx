import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts().then(setPosts);
    getUsers().then(setUsers);
  }, []);

  const handleSelectChange = ({ target }) => {
    if (+target.value === 0) {
      getPosts().then(setPosts);
    }

    getUserPosts(+target.value).then(setPosts);
  };

  const selectedPost = (postId) => {
    if (postId === selectedPostId) {
      return setSelectedPostId(0);
    }

    return setSelectedPostId(postId);
  };

  return (
    <>
      <div className="App">
        <header className="App__header">
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              onChange={handleSelectChange}
            >
              <option
                value="0"
              >
                All users
              </option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </header>

        <main className="App__main">
          <div className="App__sidebar">
            <PostsList
              posts={posts}
              selectedPost={selectedPost}
              selectedPostId={selectedPostId}
            />
          </div>

          <div className="App__content">
            {selectedPostId
              ? (
                <PostDetails selectedPostId={selectedPostId} />
              )
              : (<h2>Open post to see details</h2>)
            }
          </div>
        </main>
      </div>

    </>
  );
};

export default App;
