import { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { Post } from './types/Post';
import { User } from './types/User';

import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
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
      const postsFromServer: Post[] = await getAllPosts();

      setPosts(postsFromServer);
    };

    const fetchUserPosts = async () => {
      const userPosts = await getUserPosts(selectedUserId);

      setPosts(userPosts);
    };

    try {
      (selectedUserId === 0 ? fetchPosts : fetchUserPosts)();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error has occurred when fetching posts');
    }
  }, [selectedUserId]);

  const selectPost = (newSelectedPostId: Post['id']) => {
    setSelectedPostId(newSelectedPostId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelect">
          Select a user: &nbsp;
          <select
            value={selectedUserId}
            id="userSelect"
            className="App__user-selector"
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {posts && (
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              selectPost={selectPost}
            />
          )}
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
