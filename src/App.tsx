import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers } from './api/users';
import { client } from './utils/fetchClient';

import { useEffect, useState } from 'react';

import { User } from './types/User';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

enum PostState {
  Loading = 'loading',
  LoadingError = 'error',
  LoadingSuccess = 'success',
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [postState, setPostState] = useState<PostState | null>(null);

  useEffect(() => {
    getUsers()
      .then(loadedUsers => {
        setUsers(loadedUsers);
      })
      .catch(() => {
        // Handle error here
      });
  }, []);

  useEffect(() => {
    setActivePost(null);

    if (activeUser === null || activeUser < 1) {
      setPostState(null);
      setPosts([]);

      return;
    }

    setPostState(PostState.Loading);

    client
      .get<Post[]>(`/posts?userId=${activeUser}`)
      .then(loadedPosts => {
        setPosts(loadedPosts);
        setPostState(PostState.LoadingSuccess);
      })
      .catch(() => {
        setPostState(PostState.LoadingError);
      });
  }, [activeUser]);

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
                {activeUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postState === PostState.LoadingSuccess &&
                  (posts.length > 0 ? (
                    <PostsList
                      posts={posts}
                      activePost={activePost}
                      setActivePost={setActivePost}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}

                {postState === PostState.Loading && <Loader />}

                {postState === PostState.LoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
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
              { 'Sidebar--open': activePost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost !== null && <PostDetails post={activePost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
