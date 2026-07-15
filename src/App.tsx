//#region imports
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers, getPosts } from '../public/api/api';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
//#endregion imports

export const App = () => {
  //#region states
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [openPostID, setOpenPostID] = useState<number | null>(null);

  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isPostsError, setIsPostsError] = useState<string | null>(null);

  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isUsersError, setUsersIsError] = useState<string | null>(null);

  const [isPendingTransition, setIsPendingTransition] = useState(false);
  //#endregionstates

  //#region useEffect
  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      setIsUsersLoading(true);

      try {
        const dataUsers = await getUsers();

        if (!ignore) {
          setUsers(dataUsers);
          setUsersIsError(null);
        }
      } catch {
        if (ignore) {
          return;
        }

        setUsersIsError('Unable to load users');
      } finally {
        if (!ignore) {
          setIsUsersLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!currentUser) {
      setPosts([]);
      setIsPendingTransition(false);

      return;
    }

    const loadPosts = async () => {
      setIsPostsLoading(true);
      setPosts([]);
      setIsPostsError(null);

      try {
        const dataPosts = await getPosts(currentUser.id);

        if (!ignore) {
          setPosts(dataPosts);
          setIsPostsError(null);
        }
      } catch {
        if (ignore) {
          return;
        }

        setIsPostsError('Something went wrong!');
      } finally {
        setIsPostsLoading(false);
        setIsPendingTransition(false);
      }
    };

    loadPosts();

    return () => {
      ignore = true;
    };
  }, [currentUser]);

  useEffect(() => {
    const handleHashChange = () => {
      const idStringFromUrl = window.location.hash.replace('#user-', '');

      if (!idStringFromUrl) {
        setCurrentUser(null);

        return;
      }

      const userId = Number(idStringFromUrl);
      const findedCurrUser = users.find(user => user.id === userId);

      if (findedCurrUser) {
        setIsPendingTransition(true);

        setCurrentUser(findedCurrUser);
        setPosts([]);
        setOpenPostID(null);
      } else {
        setCurrentUser(null);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [users]);

  useEffect(() => {
    window.location.hash = '';
  }, []);
  //#endregion useEffect

  //#region ---------functions----------
  const renderingContent = () => {
    const postsLength = posts.length;

    if (!currentUser) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (isPostsLoading || isPendingTransition) {
      return <Loader />;
    }

    if (isPostsError) {
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {isPostsError}
        </div>
      );
    }

    if (postsLength === 0) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        posts={posts}
        onOpenPostID={setOpenPostID}
        openedPostID={openPostID}
      />
    );
  };

  const handleUserSelect = (userId: number) => {
    const foundCurrUser = users.find(user => user.id === userId);

    if (foundCurrUser) {
      setIsPostsLoading(true);
      setCurrentUser(foundCurrUser);
      setPosts([]);
      setOpenPostID(null);
      setIsPendingTransition(true);
    }
  };

  const selectedPost = posts.find(post => post.id === openPostID);
  //#endregion functions

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  isLoading={isUsersLoading}
                  isError={isUsersError}
                  currentUser={currentUser}
                  onUserSelect={handleUserSelect}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {renderingContent()}
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
              { 'Sidebar--open': openPostID },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
