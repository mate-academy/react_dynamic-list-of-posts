import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { User } from './types/User';

export const App: React.FC = React.memo(() => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const loadPosts = (userId: number) => {
    getUserPosts(userId).then(setPosts);
  };

  const loadUsers = () => {
    getUsers().then(loadedUsers => setUsers(loadedUsers));
  };

  useEffect(() => {
    Promise.all([loadPosts(selectedUserId), loadUsers()]);
  }, [selectedUserId]);

  const selectPost = useCallback(
    (postId: number) => {
      setSelectedPostId(postId);
    },
    [],
  );

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => setSelectedUserId(Number(event.target.value))}
          >
            <option
              value="0"
              key={0}
            >
              All users
            </option>
            {
              users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            selectPost={selectPost}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
});
