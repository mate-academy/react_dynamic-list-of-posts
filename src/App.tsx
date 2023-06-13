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
import { ErrorMessage } from './types/Error';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import {
  deleteComment,
  getPostComments,
  getUserPosts,
  getUsers,
} from './api/users';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.None);

  useEffect(() => {
    getUsers()
      .then(usersFromData => setUsers(usersFromData));
  }, []);

  useEffect(() => {
    setIsLoadingPost(true);

    if (selectedUserId) {
      setError(ErrorMessage.None);

      getUserPosts(selectedUserId)
        .then(posts => setUserPosts(posts))
        .catch(() => setError(ErrorMessage.UserPosts))
        .finally(() => setIsLoadingPost(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);

      getPostComments(selectedPost.id)
        .then(comments => setPostComments(comments))
        .finally(() => setIsLoadingComments(false));
    }
  }, [selectedPost]);

  const handleSelectedUser = (userId: number) => {
    setSelectedUserId(userId);
    setIsOpenSidebar(false);
    setError(ErrorMessage.None);

    setSelectedPost(null);
  };

  const handleSelectedPost = (postId: number) => {
    const newSelectedPost = userPosts.find(({ id }) => id === postId);

    if (newSelectedPost) {
      setSelectedPost(newSelectedPost);
    }

    setError(ErrorMessage.None);
  };

  const handleDeleteComment = (commentId: number) => {
    setError(ErrorMessage.None);

    deleteComment(commentId)
      .then(() => {
        const newCommentList = postComments
          .filter(({ id }) => id !== commentId);

        setPostComments(newCommentList);
      })
      .catch(() => setError(ErrorMessage.Delete));
  };

  const handleToggleSidebar = (status?: boolean) => {
    if (status) {
      setIsOpenSidebar(status);
    } else {
      setIsOpenSidebar(!isOpenSidebar);
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
                  selectedUserId={selectedUserId}
                  handleSelectedUser={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(isLoadingPost && selectedUserId) && (
                  <Loader />
                )}

                {error === ErrorMessage.UserPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {(!isLoadingPost && !userPosts.length && !error) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(!!userPosts.length && !isLoadingPost) && (
                  <PostsList
                    userPosts={userPosts}
                    handleSelectedPost={handleSelectedPost}
                    selectedPost={selectedPost}
                    handleToggleSidebar={handleToggleSidebar}
                    isOpenSidebar={isOpenSidebar}
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
                'Sidebar--open': isOpenSidebar,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  postComments={postComments}
                  selectedPost={selectedPost}
                  handleDeleteComment={handleDeleteComment}
                  setPostComments={setPostComments}
                  isLoadingComments={isLoadingComments}
                  error={error}
                  setError={setError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
