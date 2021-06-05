import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getUserPostsWithQuery } from './api/posts';
import { getAllUsers } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedPostId, setPostId] = useState(0);

  useEffect(() => {
    getUserPosts()
      .then(postsFromServer => setPosts(postsFromServer.data));
    getAllUsers()
      .then(usersFromServer => setUsers(usersFromServer.data));
  }, []);

  const selectUserPosts = ({ target }) => {
    if (target.value === '0') {
      getUserPosts()
        .then(postsFromServer => setPosts(postsFromServer.data));
    } else {
      getUserPostsWithQuery(target.value)
        .then(postsFromServer => setPosts(postsFromServer.data));
    }
  };

  const selectOnePost = (id) => {
    getUserPosts(id)
      .then(postFromServer => setPost(postFromServer.data));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectUserPosts}
          >
            <option value="0">All users</option>
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
          <PostsList
            posts={posts}
            postId={selectedPostId}
            setPostId={setPostId}
            selectOnePost={selectOnePost}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0
          && (
            <PostDetails
              {...post}
              selectedPostId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
