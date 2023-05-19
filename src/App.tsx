import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';

import { getUsers, getUserPosts } from './api/data';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);
  const [isGetPostsError, setIsGetPostsError] = useState<boolean>(false);
  const [isNoPostNotif, setNoPostNotif] = useState<boolean>(false);
  const [activePostId, setActivePostId] = useState<null | number>(null);

  const usersGetter = useCallback(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    usersGetter();
  }, []);

  useEffect(() => {
    if (posts) {
      setPosts(null);
    }

    if (isNoPostNotif) {
      setNoPostNotif(false);
    }

    const fetchPosts = async (id: number) => {
      try {
        const responce = await getUserPosts(id);

        if (responce.length) {
          setPosts(responce);
        } else {
          setNoPostNotif(true);
        }
      } catch {
        setIsGetPostsError(true);
      } finally {
        setIsPostsLoading(false);
      }
    };

    if (selectedUserId) {
      if (isGetPostsError) {
        setIsGetPostsError(false);
      }

      setIsPostsLoading(true);
      fetchPosts(selectedUserId);
    }
  }, [selectedUserId]);

  const activePost = useMemo(() => {
    if (posts) {
      return posts.find(p => p.id === activePostId);
    }

    return null;
  }, [activePostId, posts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersList={users}
                  setUser={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostsLoading && <Loader />}

                {isGetPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostNotif && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts?.length
                  && (
                    <PostsList
                      userPosts={posts}
                      activePost={activePostId}
                      setActivePost={setActivePostId}
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
              { 'Sidebar--open': activePost },
            )}
          >
            {activePost && (
              <div className="tile is-child box is-success ">
                <PostDetails activePoste={activePost} />
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};
