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
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [fetchUsersError, setFetchUsersError] = useState(false);
  const [fetchPostsError, setFetchPostsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        setUsers(response);
      } catch (error) {
        setFetchUsersError(true);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts(selectedUserId);

        setPosts(response);
      } catch (error) {
        setFetchPostsError(true);
      }
    };

    fetchUserPosts();
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
          <span>Select a user: </span>

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleSelectedUserId}
          >
            <option disabled value="0">All users</option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {fetchUsersError && (
          <span>Failed to load users</span>
        )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {fetchPostsError && (
            <span>Failed to load posts</span>
          )}
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            handleSelectedPostId={handleSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && selectedPostId > 0 && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
