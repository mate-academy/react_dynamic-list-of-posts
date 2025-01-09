import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getPostsByUser, getUsers } from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postsError, setPostsError] = useState('');
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [mainLoading, setMainLoading] = useState(false);
  const [postSelected, setPostSelected] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!userSelected?.id) {
      setPosts([]);
      setMainLoading(false);

      return;
    }

    setMainLoading(true);
    getPostsByUser(userSelected.id)
      .then(setPosts)
      .catch(() => setPostsError('Failed to load the user posts.'))
      .finally(() => setMainLoading(false));
  }, [userSelected]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  userSelected={userSelected}
                  setUserSelected={setUserSelected}
                  setComments={setComments}
                  setPosts={setPosts}
                  setPostSelected={setPostSelected}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {userSelected && mainLoading && <Loader />}

                {userSelected && !mainLoading && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}
                {/* eslint-disable */}
                {userSelected &&
                  !mainLoading &&
                  posts.length === 0 &&
                  !postsError && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {/* eslint-enable */}

                {userSelected && !mainLoading && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    postSelected={postSelected}
                    setPostSelected={setPostSelected}
                    setIsFormVisible={setIsFormVisible}
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
              { 'Sidebar--open': postSelected !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {postSelected && (
                <PostDetails
                  postSelected={postSelected}
                  comments={comments}
                  setComments={setComments}
                  isFormVisible={isFormVisible}
                  setIsFormVisible={setIsFormVisible}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
