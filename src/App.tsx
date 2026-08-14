/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(false);

  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setIsUsersLoading(true);
      setUsersError(false);

      try {
        const loadedUsers = await client.get<User[]>('/users');

        setUsers(loadedUsers);
      } catch {
        setUsersError(true);
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setSelectedPost(null);

      return;
    }

    const loadPosts = async () => {
      setIsPostsLoading(true);
      setPostsError(false);
      setSelectedPost(null);

      try {
        const loadedPosts = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`,
        );

        setPosts(loadedPosts);
      } catch {
        setPosts([]);
        setPostsError(true);
      } finally {
        setIsPostsLoading(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  const handlePostSelect = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isUsersLoading && <Loader />}

                {usersError && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isUsersLoading && !usersError && (
                  <UserSelector
                    users={users}
                    selectedUser={selectedUser}
                    onSelect={setSelectedUser}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isPostsLoading && <Loader />}

                {selectedUser && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
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

                {selectedUser &&
                  !isPostsLoading &&
                  !postsError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelect={handlePostSelect}
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
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
