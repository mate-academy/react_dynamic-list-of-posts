/* eslint-disable */
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
import { getUsers } from './api/Users';
import { Post } from './types/Post';
import { getPosts } from './api/Posts';
import { deleteComment } from './api/Comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User | null>(null);
  const [selectedUsersName, setSelectedUsersName] = useState('Choose a user');
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);
  const [postsComments, setPostsComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [onClosedComments, setOnClosedComments] = useState(false);

  const handleRequest = async () => {
    try {
      const allUsers = await getUsers();

      setUsers(allUsers);
    } catch (errors) {
      setErrorMessage('Failed to load users.');
    } finally {
      setErrorMessage(null);
    }
  };

  const loadUserPosts = async (userId: number) => {
    try {
      setLoading(true);
      const posts = await getPosts(userId);

      setUsersPosts(posts);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load user posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComments = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      setPostsComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );

      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('');
    }
  };

  const handlePostCommentSelect = (post: Post) => {
    setOpenedPost(post);
    setOnClosedComments(false);
    setOnClosedComments(true);
  };

  const handleSetOnClosedComments = (value: boolean) => {
    setOnClosedComments(value);
  };

  useEffect(() => {
    handleRequest().finally(() => setLoading(false));
    setSelectedUsers(null);
  }, []);

  const handleUserSelect = (selectedUser: User) => {
    setSelectedUsers(selectedUser);
    setSelectedUsersName(selectedUser.name);
    loadUserPosts(selectedUser.id);
    setOpenedPost(null);
    setOnClosedComments(true);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onUserSelect={handleUserSelect}
                  users={users}
                  selectedUserName={selectedUsersName}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUsers && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!errorMessage &&
                  selectedUsers &&
                  !loading &&
                  !usersPosts.length && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {selectedUsers && !loading && !!usersPosts.length && (
                  <PostsList
                    selectedUsers={selectedUsers}
                    usersPosts={usersPosts}
                    onPostCommentSelect={handlePostCommentSelect}
                    setOnClosedComments={handleSetOnClosedComments}
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
              { 'Sidebar--open': openedPost && onClosedComments },
            )}
          >
            {!loading && openedPost && onClosedComments && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  openedPost={openedPost}
                  postsComments={postsComments}
                  onDeleteComments={handleDeleteComments}
                  postBody={openedPost.body}
                  postIdComment={openedPost.id}
                  postTitle={openedPost.title}
                  setPostsComments={setPostsComments}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
