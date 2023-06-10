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
import { getPostComments, getUserPosts, getUsers } from './api';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isError, setIsError] = useState(Error.NONE);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [formIsActive, setFormIsActive] = useState(false);

  useEffect(() => {
    setIsError(Error.NONE);

    getUsers()
      .then((usersFromServer) => setUsers(usersFromServer))
      .catch(() => setIsError(Error.USERS));
  }, []);

  const handleUserSelect = (userId: number) => {
    setSelectedPostId(0);
    setSelectedUserPosts([]);
    setIsError(Error.NONE);

    if (userId === selectedUserId) {
      return;
    }

    setIsLoading('users');
    setSelectedUserId(userId);

    getUserPosts(userId)
      .then((userPostsFromServer) => {
        if (userPostsFromServer.length === 0) {
          setIsError(Error.NOPOSTS);
        }

        setSelectedUserPosts(userPostsFromServer);
      })
      .catch(() => {
        setIsError(Error.USERS);
        setSelectedUserPosts([]);
      })
      .finally(() => setIsLoading(''));
  };

  const handleCommentsLoads = (postId: number) => {
    setIsLoading('comments');
    setIsError(Error.NONE);

    getPostComments(postId)
      .then(commentsFromServer => setPostComments(commentsFromServer))
      .catch(() => setIsError(Error.COMMENTS))
      .finally(() => setIsLoading(''));
  };

  const handlePostSelect = (postId: number) => {
    if (postId !== selectedPostId) {
      setFormIsActive(false);
    }

    setSelectedPostId(postId);
    handleCommentsLoads(postId);
  };

  const handleAddComment = (newComment: Comment) => {
    setPostComments([...postComments, newComment]);
  };

  const selectedPost
    = selectedUserPosts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelectUser={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isError && selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading === 'users' && <Loader />}

                {isError === Error.USERS && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {isError}
                  </div>
                )}

                {
                  !isLoading
                  && isError === Error.NOPOSTS
                  && selectedUserId > 0
                  && selectedUserPosts.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      {isError}
                    </div>
                  )
                }

                {
                  selectedUserId !== 0
                  && selectedUserPosts.length > 0
                  && !isError
                  && (
                    <PostsList
                      posts={selectedUserPosts}
                      selectedPostId={selectedPostId}
                      onSelectPost={handlePostSelect}
                    />
                  )
                }
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
              { 'Sidebar--open': selectedPostId !== 0 },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId > 0
                && (
                  <PostDetails
                    post={selectedPost}
                    isLoading={isLoading}
                    comments={postComments}
                    onAddComment={handleAddComment}
                    onDeleteComment={setPostComments}
                    isError={isError}
                    formIsActive={formIsActive}
                    onSetFormIsActive={setFormIsActive}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
