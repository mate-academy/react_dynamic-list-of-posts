import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/post';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { User } from './types/user';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();

      setUsers(response);
    };

    const fetchUserPosts = async () => {
      const response = await getUserPosts(selectedUserId);

      setPosts(response);
    };

    try {
      fetchUsers();
    } catch (error) {
      throw new Error(`${error}`);
    }

    try {
      fetchUserPosts();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [selectedUserId]);

  const handleSelectedUserId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(Number(event.target.value));
  };

  const handleSelectedPostId = useCallback((postId: number) => {
    setSelectedPostId(postId);
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleSelectedUserId}
          >
            <option value="0">All users</option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
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
            selectedPostId={selectedPostId}
            handleSelectedPostId={handleSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
