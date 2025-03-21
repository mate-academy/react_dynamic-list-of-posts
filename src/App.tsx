import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPostsByUserId } from './api/posts';
import { Post } from './types/Post';
import { Sidebar } from './components/Sidebar';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errors, setErrors] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    getUsers()
      .then(response => {
        if (!Array.isArray(response)) {
          throw new Error('not found');
        }

        setUsers(response);
        setErrors(false);
      })
      .catch(() => {
        setErrors(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoad(true);
      setSelectedPost(null);
      setPosts([]);
      getPostsByUserId(selectedUser)
        .then(response => {
          if (!Array.isArray(response)) {
            throw new Error('not found');
          }

          setPosts(response);
          setErrors(false);
        })
        .catch(() => {
          setErrors(true);
        })
        .finally(() => setIsLoad(false));
    }
  }, [selectedUser]);

  const handleSelect = (userId: number | null) => {
    setIsLoad(true);
    setSelectedUser(userId);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onSelect={handleSelect} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {!errors && isLoad && <Loader />}

                {errors && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!errors && selectedUser && !isLoad && (
                  <PostsList
                    posts={posts}
                    selected={selectedPost}
                    onSelect={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>
          <Sidebar selectedPost={selectedPost} />
        </div>
      </div>
    </main>
  );
};
