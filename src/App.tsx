import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts, getUsers } from './services/api';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [usersFromServer, setUsersFromServer] = useState<User[] | null>(null);
  const [postsFromServer, setPostsFromServer] = useState<Post[] | null>(null);

  const [isErrorShowing, setIsErrorShowing] = useState(false);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);

    setIsPostsLoading(true);
    getPosts(user.id, setIsErrorShowing, setPostsFromServer)
      .finally(() => setIsPostsLoading(false));
  };

  useEffect(() => {
    getUsers(setIsErrorShowing, setUsersFromServer);
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  setSelectedUser={selectUser}
                  usersFromServer={usersFromServer}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {isErrorShowing && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {postsFromServer && (
                  <>
                    {postsFromServer?.length > 0 ? (
                      <PostsList
                        postsFromServer={postsFromServer}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    ) : (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
