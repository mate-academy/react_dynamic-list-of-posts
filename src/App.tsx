import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList/PostsList';
import { UserSelector } from './components/UserSelector/UserSelector';
import { useSelectedUser } from './components/Contexts/UserContext';
import { PostDetailsSidebar } from
  './components/PostDetailsSidebar/PostDetailsSidebar';
import { PostType } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const [isNewCommentActive, setIsNewCommentActive] = useState(false);
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const [isPostsLoadingError, setIsPostsLoadingError] = useState(false);

  const { selectedUser, setSelectedUser } = useSelectedUser();

  const changeSelectedUser = (newUser: User) => {
    setSelectedPost(null);
    setSelectedUser(null);
    setSelectedUser(newUser);
  };

  const handleHideOnBlur = () => {
    if (isDropDownActive) {
      setIsDropDownActive(false);
    }
  };

  const isUserValid = selectedUser && !isPostsLoadingError;

  return (
    <main
      className="section"
      role="presentation"
      onClick={handleHideOnBlur}
    >
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isDropDownActive={isDropDownActive}
                  onCloseDropDown={setIsDropDownActive}
                  onChangeUser={changeSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {isPostsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {isUserValid && (
                  <PostsList
                    selectedPost={selectedPost}
                    selectedUser={selectedUser}
                    onSelectPost={(post) => setSelectedPost(post)}
                    onAddComment={setIsNewCommentActive}
                    onError={setIsPostsLoadingError}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetailsSidebar
                  selectedPost={selectedPost}
                  isNewComment={isNewCommentActive}
                  onAddComment={setIsNewCommentActive}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
