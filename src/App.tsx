import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { DispatchContext, StateContext } from './reducer/store';
import { Notifications } from './components/Notifications/Notifications';
import { UserSelector } from './components/UserData/UserSelector';
import { PostsList } from './components/PostData/PostsList';
import { Loader } from './components/Loader';
import { Sidebar } from './components/Sidebar/Sidebar';
import { userService } from './services/user.service';
import { postService } from './services/post.service';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { selectedUser, postsList } = useContext(StateContext);

  useEffect(() => {
    const { getUsers } = userService(dispatch);

    getUsers(setShowNotification);
  }, []);

  useEffect(() => {
    const { setPosts } = postService(dispatch);

    setPosts(setShowNotification, selectedUser, setShowSpinner);
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {showNotification && <Notifications />}

                {showSpinner && <Loader />}

                {postsList && <PostsList postsList={postsList} />}
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
