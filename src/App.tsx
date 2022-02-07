import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts, selectedPostId } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState(0);
  const [selectPost, setSelectPost] = useState(0);

  const loadPosts = async () => {
    const postsFromServer = await getPosts();

    setPosts(postsFromServer);
  };

  const loadSelectedPosts = async () => {
    const postsFromServer = await getUserPosts(selectUser);

    setPosts(postsFromServer);
  };

  const loadUsers = async () => {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer);
  };

  const loadPostDetails = async (id: number) => {
    if (selectPost !== 0) {
      const post = await selectedPostId(id);

      setPostDetails(post);
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectUser !== 0) {
      loadSelectedPosts();
    } else {
      loadPosts();
    }
  }, [selectUser]);

  useEffect(() => {
    loadPostDetails(selectPost);
  }, [selectPost]);

  const selectHendler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+event.target.value);
  };

  const openDetailsHendler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectPost(+event.currentTarget.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select_app">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="select_app"
            value={selectUser}
            onChange={selectHendler}
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
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onDetails={openDetailsHendler}
            postId={selectPost}
          />
        </div>

        <div className="App__content">
          <PostDetails post={postDetails} />
        </div>
      </main>
    </div>
  );
};

export default App;
