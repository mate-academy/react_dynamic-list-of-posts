import { FC, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { Loader } from './components/Loader';
import { apiHelper } from './api/apiHelper';
import { Post } from './types/Post';
import { User } from './types/User';
import { getUserById } from './api/users';

const App: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    apiHelper(
      getUserPosts,
      userId,
      setIsLoading,
      setErrorMsg,
    ).then(res => {
      setPosts(res);

      if (!isPostsLoaded) {
        setIsPostsLoaded(true);
      }
    });
  }, [userId]);

  useEffect(() => {
    const uniqueIds = new Set(posts.map(post => post.userId));
    const usersRequests = Array.from(uniqueIds).map(id => getUserById(id));

    Promise.all(usersRequests)
      .then(data => {
        if ('Error' in data) {
          throw new Error('error');
        } else {
          setUsers(data);
        }
      });
  }, [isPostsLoaded]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => setUserId(Number(event.target.value))}
          >
            <option value="0">All users</option>
            {users.length > 0 && (
              users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            )}
          </select>
        </label>
      </header>

      {!isLoading && !errorMsg && (
        <main className="App__main">
          <div className="App__sidebar">
            <PostsList
              posts={posts}
              selectedPostId={selectedPostId}
              onSelectedPostId={setSelectedPostId}
            />
          </div>

          {selectedPostId !== 0 && (
            <div className="App__content">
              <PostDetails postId={selectedPostId} />
            </div>
          )}
        </main>
      )}
      {isLoading && <Loader />}
      {errorMsg && <div>{`Something went wrong... ${errorMsg}`}</div>}
    </div>
  );
};

export default App;
