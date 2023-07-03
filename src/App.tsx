import React, { useEffect, useState } from 'react';
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
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { ErrorMessages } from './types/ErrorMessages';

export const App: React.FC = () => {
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [postsFromServer, setPostsFromServer] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowPostDetails, setIsShowPostDetails] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
    if (postId !== post.id) {
      setIsShowPostDetails(true);
      setPostId(post.id);
    } else {
      setIsShowPostDetails(false);
      setPostId(null);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    getUsers()
      .then(setUsersFromServer)
      .then(() => setIsError(false))
      .catch(() => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoader(true);
      getPosts(selectedUser.id)
        .then(setPostsFromServer)
        .then(() => {
          setIsShowPostDetails(false);
          setPostId(null);
          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoader(false);
        });
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersFromServer}
                  selectedUser={selectedUser}
                  onSelectUser={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !!usersFromServer.length && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoader && !postsFromServer.length && (
                  <Loader />
                )}

                {isError && !usersFromServer.length && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    {ErrorMessages.UnableToLoadUsers}
                  </div>
                )}

                {isError && !!usersFromServer.length
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      {ErrorMessages.UnableToLoadPosts}
                    </div>
                  )}

                {!isError && selectedUser && (
                  !postsFromServer.length && !isLoader ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={postsFromServer}
                      onSelectedPost={handleSelectedPost}
                      postId={postId}
                    />
                  )
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
                'Sidebar--open': isShowPostDetails,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
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
