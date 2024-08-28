import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import {
  loadPostComments,
  loadUserPosts,
  loadUsers,
} from './utils/fetchClient';
import { Post } from './types/Post';
import { ErrorMessage } from './helper/ErrorMessage';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(false);
  const [selectedUserPost, setSelectedUserPost] = useState<Post | null>(null);
  const [commentsOfPostId, setCommentsOfPostId] = useState<Comment[]>([]);
  const [isPostCommentsLoading, setIsPostCommentsLoading] = useState(false);
  const [isAddCommentFormActive, setIsAddCommentFormActive] = useState(false);

  useEffect(() => {
    loadUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser !== null) {
      setIsUserPostsLoading(true);
      loadUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage(ErrorMessage.LoadingError))
        .finally(() => setIsUserPostsLoading(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUserPost !== null) {
      setIsPostCommentsLoading(true);
      loadPostComments(selectedUserPost.id)
        .then(setCommentsOfPostId)
        .catch(() => setErrorMessage(ErrorMessage.LoadingError))
        .finally(() => setIsPostCommentsLoading(false));
    }
  }, [selectedUserPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!Boolean(selectedUser?.id) && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isUserPostsLoading && <Loader />}

                {Boolean(errorMessage.length) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {Boolean(userPosts.length) && !isUserPostsLoading && (
                  <PostsList
                    userPosts={userPosts}
                    setSelectedUserPost={setSelectedUserPost}
                    selectedUserPost={selectedUserPost}
                    setIsAddCommentFormActive={setIsAddCommentFormActive}
                  />
                )}
                {!userPosts.length && !errorMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
                'Sidebar--open':
                  Boolean(selectedUserPost) && !isUserPostsLoading,
              },
            )}
          >
            {Boolean(selectedUserPost) && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedUserPost={selectedUserPost}
                  commentsOfPostId={commentsOfPostId}
                  isPostCommentsLoading={isPostCommentsLoading}
                  errorMessage={errorMessage}
                  setIsAddCommentFormActive={setIsAddCommentFormActive}
                  isAddCommentFormActive={isAddCommentFormActive}
                  setCommentsOfPostId={setCommentsOfPostId}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
