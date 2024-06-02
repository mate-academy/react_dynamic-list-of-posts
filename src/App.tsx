import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Outlet } from 'react-router-dom';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
    setIsDetailOpen(post !== null);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child">
              <Outlet
                context={{
                  handlePostSelect,
                  selectedPost,
                  isDetailOpen,
                  setIsDetailOpen,
                  isFormVisible,
                  setIsFormVisible,
                }}
              />
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
                'Sidebar--open': isDetailOpen,
              },
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails
                selectedPost={selectedPost}
                isFormVisible={isFormVisible}
                setIsFormVisible={setIsFormVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
