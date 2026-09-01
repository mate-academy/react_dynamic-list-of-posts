import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
//import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Loader } from './components/Loader';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isPostsError, setIsPostsError] = useState<boolean>(false);
  const [isUsersError, setIsUsersError] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsUsersError(false);

        const result = await client.get<User[]>('/users');

        setUsers(result);
      } catch {
        setIsUsersError(true);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setSelectedPost(null);
    setIsPostsError(false);
    setIsLoadingPosts(true);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(result => {
        setPosts(result);
        setIsLoadingPosts(false);
      })
      .catch(() => {
        setIsPostsError(true);
        setIsLoadingPosts(false);
      });
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isUsersError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {!isUsersError && (
                  <UserSelector users={users} onUserSelect={setSelectedUser} />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {/* eslint-disable @typescript-eslint/indent */}
                {selectedUser &&
                  !isLoadingPosts &&
                  !isPostsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {/* eslint-enable @typescript-eslint/indent */}

                {isLoadingPosts ? (
                  <Loader />
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onPostSelect={post => {
                      setSelectedPost(
                        selectedPost?.id === post.id ? null : post,
                      );
                    }}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

App.propTypes = {};
