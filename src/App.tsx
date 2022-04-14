/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { User } from './types/User';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const selectPost = useCallback((postId:number) => {
    setSelectedPostId(postId);
  }, [setSelectedPostId]);

  const loadPosts = (userId?:number) => {
    getUserPosts(userId).then(loadedPosts => setPosts(loadedPosts));
  };

  const loadUsers = () => {
    getUsers().then(loadedUsers => setUsers(loadedUsers.slice(0, 8)));
  };

  useEffect(() => {
    Promise.all([loadPosts(), loadUsers()]);
  }, []);

  const selectHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
    loadPosts(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectHandler}
          >
            <option value="0">all users</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectPost={selectPost}
            selectedPost={selectedPostId}
          />
        </div>

        <div className="App__content">
          {Boolean(selectedPostId) && (<PostDetails selectedPostId={selectedPostId} />)}
        </div>
      </main>
    </div>
  );
};

export default App;
