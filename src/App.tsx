import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';
import * as api from './api';
import { LoadingStatus } from './types/LoadingStatus';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('idle');
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [openPost, setOpenPost] = useState<Post | null>(null);

  const handleOpenPost = (post: Post | null) => {
    if (post === openPost) {
      setOpenPost(null);

      return;
    }

    setOpenPost(post);
  };

  useEffect(() => {
    api
      .getUsers()
      .then(fetchData => setUsers(fetchData))
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    setOpenPost(null);
    if (!activeUser) {
      setPosts([]);
      setStatus('idle');

      return;
    }

    setStatus('loading');

    api
      .getPostsOfUser(activeUser.id)
      .then(data => {
        setPosts(data);
        setStatus('success');
      })
      .catch(() => {
        setPosts([]);
        setStatus('error');
      });
  }, [activeUser]);

  const renderMainContent = () => {
    if (!activeUser) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    switch (status) {
      case 'loading':
        return <Loader />;

      case 'error':
        return (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            Something went wrong!
          </div>
        );

      case 'success':
        return posts.length === 0 ? (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        ) : (
          <PostsList
            posts={posts}
            openPost={openPost}
            onOpenPost={handleOpenPost}
          />
        );

      case 'idle':
      default:
        return <p data-cy="NoSelectedUser">No user selected</p>;
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
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {renderMainContent()}
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
              { 'Sidebar--open': openPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {openPost && <PostDetails openPost={openPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
