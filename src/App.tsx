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
import { usersFromServer } from './api/users';
import { Post } from './types/Post';
import { postsFromServer } from './api/posts';
import { ShowError } from './types/ShowErrors';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState<ShowError | null>(null);
  const [loader, setLoader] = useState(false);
  const [showPostDetail, setPostDetail] = useState(false);

  const saveUser = (user: User) => setSelectedUser(user);
  const savePost = (post: Post) => setSelectedPost(post);
  const setShowPostDetail = (show: boolean) => setPostDetail(show);

  useEffect(() => {
    usersFromServer
      .then(newUsers => setUsers(newUsers));
  }, []);
  useEffect(() => {
    setPostDetail(false);
    setError(null);

    if (selectedUser) {
      setLoader(true);

      postsFromServer(selectedUser.id)
        .then(newPosts => {
          if (newPosts.length === 0) {
            setError(ShowError.postWarning);
          }

          setPosts(newPosts);
        })
        .catch(() => setError(ShowError.error))
        .finally(() => setLoader(false));
    }
  }, [selectedUser]);

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
                  saveSelectedUser={saveUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">
                  {selectedUser
                    ? selectedUser.name
                    : 'No user selected'}
                </p>

                {loader && <Loader />}

                {error && (
                  <div
                    className={classNames(
                      'notification',
                      {
                        'is-danger': error === ShowError.error,
                        'is-warning': error === ShowError.postWarning,
                      },
                    )}
                    data-cy={classNames(
                      {
                        PostsLoadingError: error === ShowError.error,
                        NoPostsYet: error === ShowError.postWarning,
                      },
                    )}
                  >
                    {error}
                  </div>
                )}

                {posts.length > 0
                && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    savePost={savePost}
                    showPostDetail={showPostDetail}
                    setShowPostDetail={setShowPostDetail}
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
              {
                'Sidebar--open': showPostDetail,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && showPostDetail
              && (
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
