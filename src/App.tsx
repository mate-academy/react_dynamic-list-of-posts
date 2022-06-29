import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { Post, User } from './react-app-env';
import { getUserPosts } from './api/post';
import { getUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(postsFromServer => setPosts(postsFromServer));

    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const setPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const visiblePosts = posts.filter(post => {
    if (!selectedUserId) {
      return post;
    }

    return post.userId === selectedUserId;
  });

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>
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
            posts={visiblePosts}
            selectPostId={selectedPostId}
            onSelectedPostId={setPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
