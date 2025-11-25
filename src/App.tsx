import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [postsError, setPostsError] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setIsUsersLoading(true);
      setUsersError('');

      try {
        const fetchedUsers = await client.get<User[]>('/users');

        setUsers(fetchedUsers);
      } catch (err) {
        setUsersError('Unable to load users');
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const userIdToFetch = selectedUserId;
    let isCancelled = false;

    setPosts([]);
    setPostsError('');
    setSelectedPost(null);
    // setIsPostsLoading(false);

    if (userIdToFetch) {
      const fetchPosts = async () => {
        setIsPostsLoading(true);

        try {
          const fetchedPosts = await client.get<Post[]>(
            `/users/${String(userIdToFetch)}/posts`,
          );

          if (!isCancelled) {
            setPosts(fetchedPosts);
          }
        } catch (err) {
          if (!isCancelled) {
            setPostsError('Unable to load posts for this user.');
          }
        } finally {
          if (!isCancelled) {
            setIsPostsLoading(false);
          }
        }
      };

      fetchPosts();
    }

    return () => {
      isCancelled = true;
    };
  }, [selectedUserId]);

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
                  setSelectedUserId={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && !isUsersLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {usersError && !isUsersLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    {usersError}
                  </div>
                )}

                {(isPostsLoading || isUsersLoading) && <Loader />}

                {selectedUserId && !isPostsLoading && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {/* eslint-disable react/jsx-indent, react/jsx-closing-tag-location, indent, @typescript-eslint/indent */}
                {selectedUserId &&
                  !isPostsLoading &&
                  !postsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {/* eslint-enable react/jsx-indent, react/jsx-closing-tag-location, indent, @typescript-eslint/indent */}

                {posts.length > 0 && !postsError && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              <PostDetails selectedPost={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
