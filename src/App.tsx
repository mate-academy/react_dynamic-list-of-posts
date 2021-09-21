import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getUserPost } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postsList, setPosts] = useState<Post[]>([]);
  const [usersList, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const UserPost = async () => {
      const posts = await getUserPosts('');
      const users = await getUsers();

      setUsers(users);
      setPosts(posts);
    };

    UserPost();
  }, []);

  useEffect(() => {
    const UserPost = async () => {
      const post = await getUserPost(`/${selectedPostId}`);

      setSelectedPost(post);
      setSelectedPostId(0);
    };

    UserPost();
  }, [selectedPostId]);

  // eslint-disable-next-line no-console
  console.log(selectedPost);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const UserPost = async () => {
      const posts = await getUserPosts(value !== '' ? `?userId=${value}` : '');

      setPosts(posts);
    };

    UserPost();
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleChange}
          >
            <option value="">All users</option>
            {usersList.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            postsList={postsList}
            setSelectedPostId={setSelectedPostId}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
          />
        </div>

        {selectedPost
          && (
            <div className="App__content">
              <PostDetails selectedPost={selectedPost} />
            </div>
          )}
      </main>
    </div>
  );
};

export default App;
