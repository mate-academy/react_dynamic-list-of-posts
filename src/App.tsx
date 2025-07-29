import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Sidebar } from './components/Sidebar';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Unable to load users');
      });
  }, []);

  const handleSidebar = (post: Post | null) => {
    if (post && post.id === activePost?.id) {
      setActivePost(null);
      setSidebarIsOpen(false);
    } else {
      setActivePost(post);
      setSidebarIsOpen(true);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  ''
                )}

                {errorMessage ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong
                  </div>
                ) : (
                  ''
                )}
              </div>

              {selectedUser && (
                <PostsList
                  selectedUser={selectedUser}
                  setErrorMessage={setErrorMessage}
                  handleSidebar={handleSidebar}
                  activePost={activePost}
                />
              )}
            </div>
          </div>
          {sidebarIsOpen && <Sidebar activePost={activePost} />}
        </div>
      </div>
    </main>
  );
};
