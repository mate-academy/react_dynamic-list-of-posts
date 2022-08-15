import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { loadUsers } from './api/users';
import { getUserPosts, loadPosts } from './api/posts';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPost, setSelectedPost] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await loadUsers();

      setUsers(usersFromServer);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const loadUserPosts = async () => {
      const userPostsFromServer = (!selectedUserId)
        ? await loadPosts()
        : await getUserPosts(selectedUserId);

      setPosts(userPostsFromServer);
    };

    loadUserPosts();
  }, [selectedUserId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const getPostId = (postId: number) => {
    setSelectedPost(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={handleChange}>
            <option value="0">All users</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            getPost={getPostId}
            selectedPost={selectedPost}
          />
        </div>

        {!!selectedPost && (
          <div className="App__content">
            <PostDetails postId={selectedPost} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
