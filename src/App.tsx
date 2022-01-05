/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { Post } from './Types/Post';
import { User } from './Types/User';
import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<User['id']>(0);
  const [selectedPostId, setSelectedPostId] = useState<Post['id']>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromServer: User[] = await getAllUsers();

        setUsers(usersFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching useres');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromServer = await getAllPosts();

      setPosts(postsFromServer);
    };

    const fetchUserPosts = async () => {
      const userPosts = await getUserPosts(selectedUserId);

      setPosts(userPosts);
    };

    try {
      (selectedUserId === 0 ? fetchPosts : fetchUserPosts)();
    } catch (error) {
      console.error('An error has occurred');
    }
  }, [selectedUserId]);

  const selectPost = (newSelectedPostId: Post['id']) => {
    setSelectedPostId(newSelectedPostId);
  };

  return (
    <div className="App">
      <header className="App__header">
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          value={selectedUserId}
          onChange={(event) => setSelectedUserId(+event.target.value)}
        >
          <option value="0">All users</option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList posts={posts} selectedPost={selectedPostId} selectPost={selectPost} />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
