import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts, getUsers } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadUsers = async () => {
    const usersFromApi = await getUsers();

    setUsers(usersFromApi);
  };

  const loadPosts = async () => {
    if (selectedUserId === 0) {
      const postsFromServer = await getPosts();

      setPosts(postsFromServer);

      return;
    }

    const selectedPosts = await getUserPosts(selectedUserId);

    setPosts(selectedPosts);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(event.target.value);

    setSelectedUserId(newValue);
  };

  const getPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            name="selectedUserId"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value="0">All users</option>
            {users?.map(user => (
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
          {posts.length > 0 ? (
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              getPostId={getPostId}
            />
          ) : ('No posts')}
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
