/* eslint-disable @typescript-eslint/indent */
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import React, { useEffect, useMemo, useState } from 'react';

import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { User } from './types/User';
import { UserSelector } from './components/UserSelector';
import classNames from 'classnames';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [postsFetchStatus, setPostsFetchStatus] = useState<
    'noUser' | 'loading' | 'noPosts' | 'error' | 'idle'
  >('noUser');
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
  const [openPost, setOpenPost] = useState<Post | null>(null);

  useEffect(() => {
    client.get<User[]>('/users').then(data => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    setPostsFetchStatus('loading');
    if (selectedUserId) {
      client
        .get<Post[]>('/posts?userId=' + selectedUserId)
        .then(data => {
          setSelectedPosts(data);
          if (data.length === 0) {
            setPostsFetchStatus('noPosts');
          } else {
            setPostsFetchStatus('idle');
          }
        })
        .catch(() => {
          setPostsFetchStatus('error');
        });
    } else {
      setPostsFetchStatus('noUser');
    }
  }, [selectedUserId]);

  function changeSelectedUserId(userId: number) {
    setSelectedUserId(userId);
    setOpenPost(null);
  }

  const postDisplay = useMemo(() => {
    switch (postsFetchStatus) {
      case 'noUser':
        return <p data-cy="NoSelectedUser">No user selected</p>;
      case 'error':
        return (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            Something went wrong!
          </div>
        );
      case 'noPosts':
        return (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        );
      case 'loading':
        return <Loader />;
      default:
        return (
          <PostsList
            selectedPosts={selectedPosts}
            openPost={openPost}
            setOpenPost={setOpenPost}
          />
        );
    }
  }, [postsFetchStatus, openPost, selectedPosts]);

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
                  changeSelectedUserId={changeSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {postDisplay}
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
              { 'Sidebar--open': openPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {openPost && <PostDetails post={openPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
