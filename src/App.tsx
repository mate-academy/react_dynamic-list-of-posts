import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getData } from './api/posts';
import { Post, User } from './types';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  useEffect(() => {
    getData<User>('users')
      .then(setUsers);
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <PostsList
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                  setIsCommentLoading={setIsCommentLoading}
                />
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isCommentLoading={isCommentLoading}
                  setIsCommentLoading={setIsCommentLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
