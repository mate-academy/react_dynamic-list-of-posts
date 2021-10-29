import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUsers } from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState(0);

  const filteredPosts = () => {
    const filtered = posts.filter(post => post.userId === selectedUserId);

    return selectedUserId === 0 ? posts : filtered;
  };

  useEffect(() => {
    getUsers()
      .then(setUsers);
    getPosts()
      .then(setPosts);
  }, []);

  const findPost = (neededPostId: number) => {
    setPostId(neededPostId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            onChange={(e) => {
              setUserId(+e.target.value);
            }}
          >
            <option value="0" selected>All users</option>
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
          {filteredPosts().length > 0
            ? <PostsList posts={filteredPosts()} postId={findPost} />
            : <div>No posts</div>}
        </div>

        <div className="App__content">

          { postId !== 0 && <PostDetails posts={posts} postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
