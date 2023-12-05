import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postLoader, setPostLoader] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const isPostListEmpty = !posts.length && selectedUser && !postLoader
    && !errorMessage;
  const isPostListVisible = !!posts.length && !postLoader;

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                  users={users}
                  onSetPosts={setPosts}
                  onSetErrorMessage={setErrorMessage}
                  onSetPostLoader={setPostLoader}
                  onSelectPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {postLoader && (
                  <Loader />
                )}

                {errorMessage === ErrorMessage.GET_POSTS_ERROR && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isPostListEmpty && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {isPostListVisible && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectPost={setSelectedPost}
                    onSetComments={setComments}
                    onSetCommentLoader={setCommentLoader}
                    onSetErrorMessage={setErrorMessage}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                {
                  'Sidebar--open': selectedPost,
                },
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  errorMessage={errorMessage}
                  commentLoader={commentLoader}
                  onSetComments={setComments}
                  onSetErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
