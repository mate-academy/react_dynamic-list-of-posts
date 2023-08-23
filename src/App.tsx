import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
import { getPosts, getUsers } from './Api/Api';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isShowPostDetails, setIsShowPostDetails] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectPostId, setSelectPostId] = useState<number>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsersFromServer = () => {
    getUsers()
      .then(data => {
        const user = data as User[];

        setUsers(user);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const selectUser = users.find(person => person.id === selectedUserId);

  const getPostsFromSelectedUser = () => {
    setIsLoading(true);
    if (selectUser) {
      getPosts(selectedUserId)
        .then(data => {
          const selectedPosts = data as Post[];

          setPosts(selectedPosts);
          setIsLoading(false);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error:', error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getPostsFromSelectedUser();
    }
  }, [selectUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectUser={selectUser}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                  users={users}
                />
              </div>

              <div className="block " data-cy="MainContent">
                {isError && (
                  <>
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  </>
                )}

                {isLoading && <Loader />}

                {!selectedUserId && !isLoading
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : (posts.length > 0
                    && (
                      <PostsList
                        posts={posts}
                        isShowPostDetails={isShowPostDetails}
                        setIsShowPostDetails={setIsShowPostDetails}
                        selectedPostId={selectPostId}
                        setSelectPostId={setSelectPostId}
                      />
                    )
                  )}
                {(selectedUserId && posts.length === 0 && !isLoading)
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
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
              { 'Sidebar--open': isShowPostDetails },
            )}
          >
            {isShowPostDetails && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  isError={isError}
                  setIsError={setIsError}
                  selectedPostId={selectPostId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
