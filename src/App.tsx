import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getPostsByUser, getUsers, postInfo } from './api/posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserPosts, setcurrentUserPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [currentPostComments, setCurrentPostComments] = useState<Comment[]>([]);
  const [showCommentsLoader, setShowCommentsLoader] = useState(false);

  const getUsersFromServer = () => {
    getUsers('users')
      .then((fetchedUsers: User[]) => {
        setUsers(fetchedUsers);
        setError('');
      })
      .catch(() => {
        setError('Cannot load users');
      });
  };

  const getUserPosts = () => {
    if (selectedUser) {
      setShowLoader(true);

      getPostsByUser(selectedUser?.id)
        .then((fetchedPosts) => {
          setcurrentUserPosts(fetchedPosts);
          setError('');
          setShowLoader(false);
        })
        .catch(() => {
          setError('Cannot load user posts');
          setShowLoader(false);
        });
    }
  };

  const getPostInfo = () => {
    if (currentPost?.id) {
      setShowCommentsLoader(true);

      postInfo(currentPost.id)
        .then((fetchedComments) => {
          setCurrentPostComments(fetchedComments);
          setShowCommentsLoader(false);
        })
        .catch(() => {
          setError('Cannot load post comments');
          setShowCommentsLoader(false);
        });
    }
  };

  useEffect(getUsersFromServer, []);
  useEffect(getUserPosts, [selectedUser]);
  useEffect(getPostInfo, [currentPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setSelectedUser={setSelectedUser}
                  users={users}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <>
                    {showLoader ? (
                      <Loader />
                    ) : (
                      <>
                        {error.length ? (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            {error}
                          </div>
                        ) : (
                          <>
                            {!currentUserPosts.length ? (
                              <div
                                className="notification is-warning"
                                data-cy="NoPostsYet"
                              >
                                No posts yet
                              </div>
                            ) : (
                              <PostsList
                                posts={currentUserPosts}
                                setSideBarIsOpen={setSideBarIsOpen}
                                setCurrentPost={setCurrentPost}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
              </div>
            </div>
          </div>

          {sideBarIsOpen ? (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  postComments={currentPostComments}
                  error={error}
                  showCommentsLoader={showCommentsLoader}
                  post={currentPost}
                  getPostInfo={getPostInfo}
                  setPostComments={setCurrentPostComments}
                  setError={setError}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};
