import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getPostsByUserId } from './api/posts';
import { getAllUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      if (userId === 0) {
        const allPosts = await getAllPosts();

        setPosts(allPosts);
      } else {
        const userPosts = await getPostsByUserId(userId);

        setPosts(userPosts);
      }
    };

    getPosts();

    const getUsers = async () => {
      const usersFromServer = await getAllUsers();
      const preparedUsers = usersFromServer.filter(
        (user: User) => posts.find(post => post.userId === user.id),
      );

      setUsers(preparedUsers);
    };

    getUsers();
  }, [userId, users]);

  const changePostDetailVisability = useCallback(
    (postId: number) => {
      setSelectedPostId(postId);
    }, [],
  );

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selecteUser">
          Select a user: &nbsp;

          <select
            id="selecteUser"
            className="App__user-selector"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">All users</option>

            {users.map(user => (
              <option value={user.id}>
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
            seePostDetails={changePostDetailVisability}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (<PostDetails postId={selectedPostId} />)}
        </div>
      </main>
    </div>
  );
};

export default App;
