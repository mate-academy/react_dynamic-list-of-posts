/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { getUserPosts, getPostDetails } from './api/posts';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const loadSelectedPost = async () => {
    const postFromServer = await getPostDetails(selectedPostId);

    setSelectedPost(postFromServer);
  };

  const loadUserPosts = async () => {
    const postsFromServer = await getUserPosts(selectedUserId);

    setPosts(postsFromServer);
  };

  const loadUsers = async () => {
    const userFromServer = await getUsers();

    setUsers(userFromServer);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedPostId) {
      loadSelectedPost();
    }
  }, [selectedPostId]);

  useEffect(() => {
    loadUserPosts();
  }, [selectedUserId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const handleClick = (postId: number) => (
    postId !== selectedPostId
      ? setSelectedPostId(postId)
      : setSelectedPostId(0)
  );

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            onChange={handleChange}
            value={selectedUserId}
            className="App__user-selector"
          >
            <option key="0" value="">All users</option>
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
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            handleClick={handleClick}
          />
        </div>

        <div className="App__content">
          {selectedPostId && selectedPost ? (
            <PostDetails
              selectedPostId={selectedPostId}
              selectedPost={selectedPost}
            />
          ) : (
            <p>No post selected</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
