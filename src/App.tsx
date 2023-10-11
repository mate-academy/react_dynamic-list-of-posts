import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getPosts, getUsers } from './components/Api';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postInfo, setpostInfo] = useState<boolean>(false);
  const [selectPostId, setSelectPostId] = useState<number>();

  const getUsersFromServer = () => {
    getUsers()
      .then(user => {
        const userArray = user as User[];

        setUsers(userArray);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const selectUser = users.find(user => user.id === selectedUserId);

  const getPostsFromSelectedUser = () => {
    setLoading(true);
    setpostInfo(false);

    if (selectUser) {
      getPosts(selectedUserId)
        .then(data => {
          const selectedPosts = data as Post[];

          setPosts(selectedPosts);
          setLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setLoading(false);
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
                  users={users}
                  selectUser={selectUser}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {loading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!selectedUserId && !loading
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : (posts.length !== 0
                    && (
                      <PostsList
                        posts={posts}
                        postInfo={postInfo}
                        setpostInfo={setpostInfo}
                        selectedPostId={selectPostId}
                        setSelectPostId={setSelectPostId}
                      />
                    )
                  )}
                {(selectedUserId && posts.length === 0 && !loading)
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
              { 'Sidebar--open': postInfo },
            )}
          >

            {postInfo && (
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
