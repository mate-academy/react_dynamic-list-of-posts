import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { IErrors } from './types/IErrors';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrors>({
    isPostsError: false,
    isCommetsError: false,
    isUserError: false,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openSelector, setOpenSelector] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [idOfOpenPost, setIdOfOpenPost] = useState<number | null>(null);

  const getUsers = () => {
    client.get<User[]>('/users')
      .then(data => data?.length && setUsers(data))
      .catch(() => {
        setError(prev => ({
          ...prev,
          isUserError: true,
        }));
      })
      .finally(() => setIsLoading(false));
  };

  const getPosts = () => {
    if (!user) {
      setPosts([]);

      return;
    }

    setIsLoading(true);

    client.get<Post[]>(`/posts?userId=${user.id}`)
      .then(data => setPosts(data))
      .catch(() => {
        setError(prev => ({
          ...prev,
          isPostsEror: true,
        }));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    getUsers();
  }, []);

  useEffect(() => {
    getPosts();
  }, [user]);

  const onClickToSelector = () => {
    setOpenSelector(!openSelector);
  };

  const hendleUser = (currUser: User) => {
    setUser(currUser);
    setOpenSelector(false);
  };

  const userPosts = posts.filter(post => post.userId === user?.id);
  const currPost = userPosts.find(post => post.id === idOfOpenPost);

  const hendleOpenPost = (id: number) => {
    setIdOfOpenPost((prevId) => (
      prevId === id ? null : id
    ));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  hendleSelector={onClickToSelector}
                  openSelector={openSelector}
                  hendleUser={hendleUser}
                  isUser={user}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {
                  !user
                  && userPosts.length === 0
                  && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                }

                {isLoading && <Loader />}

                {!posts && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {
                  !isLoading
                  && user
                  && userPosts.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
                }

                {user
                  && userPosts.length > 0
                  && (
                    <PostsList
                      userPosts={userPosts}
                      hendleOpenPost={hendleOpenPost}
                      idOfOpenPost={idOfOpenPost}
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
              { 'Sidebar--open': idOfOpenPost },
            )}
          >
            {idOfOpenPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  currPost={currPost}
                  isError={error.isCommetsError}
                  setError={setError}
                  idOfOpenPost={idOfOpenPost}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};
