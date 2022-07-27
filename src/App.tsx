import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import User from './components/types/User';
import { getUsers } from './api/user';
// import { getCommentsByPostId } from './api/comment';
import Post from './components/types/Post';
import { getPostsByUserID } from './api/post';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [openPostDetails, setopenPostDetails] = useState(false);
  const [failedToloadPosts, setFailedToloadPosts] = useState(false);

  useEffect(() => {
    const getDataFromServer = async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    };

    getDataFromServer();
  }, []);

  const handleSelectedUserId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(+event.target.value);
  };

  useEffect(() => {
    const getPostsByUserFromServer = async () => {
      try {
        const postsFromServer = await getPostsByUserID(selectedUserId);

        setPosts(postsFromServer);
      } catch {
        setFailedToloadPosts(true);
      }
    };

    getPostsByUserFromServer();
  }, [selectedUserId]);

  const handleSelectedPostId = (chosenPostId: number) => {
    setSelectedPostId(chosenPostId);
    setopenPostDetails(!openPostDetails);
  };

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
        {failedToloadPosts && (
          <p>Failed to load users</p>
        )}
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
          {openPostDetails && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
