import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { getUsers } from './utils/fetchClient';
import { User } from './types/User';
import { PostsList } from './components/PostsList';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [users, setUsers] = useState<User[] | null>();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [userSelectedId, setUserSelectedId] = useState(0);
  const [postSelectedId, setPostSelectedId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isShowForm, setIsShowForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      });
  }, []);

  useEffect(() => {
    setIsShowForm(false);
  }, [postSelectedId, userSelectedId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setDropDownOpen={setDropDownOpen}
                  dropDownOpen={dropDownOpen}
                  setUserSelectedId={setUserSelectedId}
                  userSelectedId={userSelectedId}
                  setPostSelectedId={setPostSelectedId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {userSelectedId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {userSelectedId !== 0
                  && (
                    <PostsList
                      userSelectedId={userSelectedId}
                      setShowSideBar={setShowSideBar}
                      postSelectedId={postSelectedId}
                      setPostSelectedId={setPostSelectedId}
                      setSelectedPost={setSelectedPost}
                    />
                  )}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': showSideBar,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  showSideBar={showSideBar}
                  isShowForm={isShowForm}
                  postSelectedId={postSelectedId}
                  selectedPost={selectedPost}
                  setIsShowForm={setIsShowForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
