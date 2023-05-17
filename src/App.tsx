import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);
  const hasUserNoPosts = !userPosts.length && isUserSelected;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();

      setUsers(res);
    };

    fetchUsers();
  }, []);

  const handleGetPosts = useCallback(async (userId: number) => {
    setIsLoading(true);
    setIsPostOpen(false);
    try {
      const res = await getPosts(userId);

      setUserPosts(res);
      setIsUserSelected(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePostSelect = (post: Post) => setSelectedPost(post);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onChange={handleGetPosts}
                />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {!isUserSelected && !isError && (
                      <p data-cy="NoSelectedUser">
                        No user selected
                      </p>
                    )}

                    {isError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong. Reload page and try again.
                      </div>
                    )}

                    {hasUserNoPosts && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {userPosts.length > 0 && (
                      <PostsList
                        posts={userPosts}
                        isPostOpen={isPostOpen}
                        onPostSelect={handlePostSelect}
                        onOpen={setIsPostOpen}
                      />
                    )}
                  </>
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
                'Sidebar--open': isPostOpen,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {isPostOpen && selectedPost && (
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
