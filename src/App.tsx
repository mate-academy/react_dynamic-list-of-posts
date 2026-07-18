import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await client.get<User[]>('/users');

        setUsers(data);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setPosts([]);
      setCurrentPost(null);

      return;
    }

    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const data = await client.get<Post[]>(
          `/posts?userId=${currentUser.id}`,
        );

        setPosts(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser]);

  const handleSelectUser = useCallback((user: User) => {
    setCurrentUser(user);
    setCurrentPost(null);
    setPosts([]);
  }, []);

  const handleSelectPost = useCallback(
    (post: Post) => {
      if (post === currentPost) {
        setCurrentPost(null);
      } else {
        setCurrentPost(post);
      }
    },
    [currentPost],
  );

  const hasUser = currentUser !== null;
  const hasPosts = posts.length > 0;

  const showNoUser = !hasUser;
  const showLoader = hasUser && isLoading;
  const showError = hasUser && !isLoading && isError;
  const showEmpty = hasUser && !isLoading && !isError && !hasPosts;
  const showPosts = hasUser && !isLoading && !isError && hasPosts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  currentUser={currentUser}
                  handleSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {showNoUser && <p data-cy="NoSelectedUser">No user selected</p>}

                {showLoader && <Loader />}

                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showEmpty && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && (
                  <PostsList
                    posts={posts}
                    currentPost={currentPost}
                    handleSelectPost={handleSelectPost}
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
              { 'Sidebar--open': currentPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails currentPost={currentPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
