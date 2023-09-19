import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { useSelectedUser } from './components/Contexts/UserContext';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isNewCommentActive, setIsNewCommentActive] = useState(false);
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const [postsLoadingError, setPostsLoadingError] = useState(false);

  const { selectedUser, setSelectedUser } = useSelectedUser();

  const changeSelectedUser = (newUser: User) => {
    setSelectedPost(null);
    setSelectedUser(null);
    setSelectedUser(newUser);
  };

  return (
    <main
      className="section"
      role="presentation"
      onClick={() => {
        if (isDropDownActive) {
          setIsDropDownActive(false);
        }
      }}
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
                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {(selectedUser && !postsLoadingError) && (
                  <PostsList
                    selectedPost={selectedPost}
                    selectedUser={selectedUser}
                    onSelectPost={(post) => setSelectedPost(post)}
                    onAddComment={setIsNewCommentActive}
                    onError={setPostsLoadingError}
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
                <PostDetails
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
