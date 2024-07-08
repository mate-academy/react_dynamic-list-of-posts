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
import { getUserPosts } from './api/posts';
import { getPostComments } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUserPost, setSelectedUserPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisibleNewCommentForm, setIsVisibleNewCommentForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setError('Unable to load users');
      });
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setSelectedUserPost(null);

    if (!!setComments) {
      setComments([]);
    }

    if (selectedUser !== null) {
      setError('');
      setIsLoading(true);
      getUserPosts(selectedUser?.id)
        .then(setUserPosts)
        .catch(() => {
          setError('Unable to load posts');
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUserPost) {
      setError('');
      setIsVisibleNewCommentForm(false);
      setIsLoadingComments(true);
      getPostComments(selectedUserPost.id)
        .then(setComments)
        .catch(() => {
          setError('Unable to load comments');
        })
        .finally(() => setIsLoadingComments(false));
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}
                {error && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {selectedUser && !userPosts.length && !error && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && !!userPosts.length && !isLoading && (
                  <PostsList
                    userPosts={userPosts}
                    selectedUserPost={selectedUserPost}
                    setSelectedUserPost={setSelectedUserPost}
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
              { 'Sidebar--open': selectedUserPost },
            )}
          >
            {selectedUserPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedUserPost={selectedUserPost}
                  comments={comments}
                  setComments={setComments}
                  isLoadingComments={isLoadingComments}
                  error={error}
                  setError={setError}
                  isVisibleNewCommentForm={isVisibleNewCommentForm}
                  setIsVisibleNewCommentForm={setIsVisibleNewCommentForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
