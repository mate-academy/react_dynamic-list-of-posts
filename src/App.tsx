import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getAllUsers } from './api/api';
import { Loader } from './components/Loader/Loader';

type Props = {
  userId: number;
};

const App: React.FC<Props> = () => {
  const [userId, setUserId] = useState('0');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<User[]>([]);

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setLoading(true);
  };

  useEffect(() => {
    getAllUsers().then(results => setUsersList(results));
  }, []);

  useEffect(() => {
    getUserPosts(userId).then(res => {
      setPosts(res);
      setLoading(false);
    });
  }, [userId]);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={selectHandler}>
            <option value="0">All users</option>
            {usersList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading ? <Loader />
            : (
              <PostsList
                posts={posts}
                setSelectedPostId={setSelectedPostId}
                selectedPostId={selectedPostId}
              />
            )}
        </div>

        <div className="App__content">
          {selectedPost
            && (
              <PostDetails
                post={selectedPost}
                selectedPostId={selectedPostId}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
