import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getAllPosts, getPostDetails, getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { User } from './types/User';

const App: React.FC = () => {
  const [visiblePosts, setVisiblePosts] = useState<Post[] | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [details, setDetails] = useState<Post | null>(null);
  const [isDetailsVisible, setDetailsVisibilyty] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const HandleSelect = async ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setVisiblePosts(null);

    if (target.value === '0') {
      setVisiblePosts(await getAllPosts());
    } else {
      getUserPosts(+target.value)
        .then(posts => setVisiblePosts(posts));
    }
  };

  useEffect(() => {
    getAllPosts()
      .then(posts => {
        setVisiblePosts(posts);
      });
  }, []);

  useEffect(() => {
    getUsers()
      .then(allUsers => {
        setUsers(allUsers);
      });

    if (selectedPostId === 0) {
      return setDetailsVisibilyty(false);
    }

    if (selectedPostId !== 0) {
      getPostDetails(selectedPostId)
        .then(post => setDetails(post));

      setDetailsVisibilyty(true);
    }

    return setDetails(null);
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={HandleSelect}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={visiblePosts}
            selectedPostId={selectedPostId}
            onSelectPost={setSelectedPostId}
            onSetDetailVisibility={setDetailsVisibilyty}
          />
        </div>

        {isDetailsVisible && (
          <div className="App__content">
            <PostDetails
              details={details}
              selectedPostId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
