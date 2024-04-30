import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/getPosts';
import { getUsers } from './api/getUsers';
import { CommentProvider } from './utils/CommentsContext';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(result => {
      setUsers(result);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsPostsError(false);
      setIsPostsLoading(true);
      getPosts(selectedUser.id)
        .then(result => {
          setPosts(result);
          setTimeout(() => setIsPostsLoading(false), 300);
        })
        .catch(() => setIsPostsError(true));
    }
  }, [selectedUser]);

  const noPosts = useMemo(() => {
    return !posts?.length && selectedUser;
  }, [posts, selectedUser, isPostsLoading]);

  return (
    <CommentProvider>
      <main className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector
                    setOpenedPost={setOpenedPost}
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                </div>
                <div className="block" data-cy="MainContent">
                  {!selectedUser && (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}
                  {isPostsLoading && !isPostsError && <Loader />}
                  {isPostsError && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}
                  {!noPosts && !isPostsLoading && posts && (
                    <PostsList
                      openedPost={openedPost}
                      setOpenedPost={setOpenedPost}
                      posts={posts}
                    />
                  )}
                  {noPosts && !isPostsLoading && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                </div>
              </div>
            </div>
            {openedPost && (
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
                  <PostDetails openedPost={openedPost} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </CommentProvider>
  );
};
