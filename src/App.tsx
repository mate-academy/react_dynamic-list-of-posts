import React, { useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

// Context
import { Provider } from './components/Context';

// Types

import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  // State
  const [postList, setPostList] = useState<Post[] | undefined>(undefined);
  const [userSelect, setUserSelect] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openForm, setOpenForm] = useState(false);

  // Errors

  const [postListError, setPostListError] = useState<boolean>(false);

  return (
    <Provider>
      <main className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector
                    setPostList={setPostList}
                    setUserSelect={setUserSelect}
                    userSelect={userSelect}
                    setPostListError={setPostListError}
                    setOpenForm={setOpenForm}
                  />
                </div>
                <div className="block" data-cy="MainContent">
                  {
                    !userSelect
                      ? (
                        <p data-cy="NoSelectedUser">
                          No user selected
                        </p>
                      )
                      : (!postList && <Loader />)
                      || (((postList && postList.length !== 0) && (
                        <PostsList
                          postList={postList}
                          selectedPost={selectedPost}
                          setSelectedPost={setSelectedPost}
                          setOpenForm={setOpenForm}
                        />
                      )) || (!postListError
                        ? (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )
                        : (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        )
                      ))
                  }
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
                  'Sidebar--open',
                )}
              >
                <div className="tile is-child box is-success ">
                  <PostDetails
                    selectedPost={selectedPost}
                    openForm={openForm}
                    setOpenForm={setOpenForm}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Provider>
  );
};
