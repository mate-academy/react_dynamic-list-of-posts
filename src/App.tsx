import React, {
  useEffect, useCallback, useState,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [usersArray, setUsersArray] = useState<User[] | []>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);
  const [openUserPost, setOpenUserPost] = useState(false);
  const [selectedUserPost, setSelectedUserPost] = useState<Post>();
  const [selectedUserPostId, setSelectedUserPostId] = useState(0);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const loadUsersFromServer = useCallback(
    async () => {
      try {
        const todosFromServer = await getUsers();

        setUsersArray(todosFromServer);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      } finally {
        setIsLoadingUserPosts(false);
      }
    }, [],
  );

  useEffect(() => {
    loadUsersFromServer();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingUserPosts(false);
    }, 500);
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersArray={usersArray}
                  selectedUser={selectedUser}
                  setIsLoadingUserPosts={setIsLoadingUserPosts}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingUserPosts && <Loader />}

                {/* {selectedUser && !isLoadingUserPosts && (
                  <>
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>

                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  </>
                )} */}

                {selectedUser && !isLoadingUserPosts && (
                  <PostsList
                    selectedUser={selectedUser}
                    openUserPost={openUserPost}
                    setOpenUserPost={setOpenUserPost}
                    // selectedUserPosts={selectedUserPosts}
                    setSelectedUserPost={setSelectedUserPost}
                    selectedUserPostId={selectedUserPostId}
                    setSelectedUserPostId={setSelectedUserPostId}
                    setIsLoadingComments={setIsLoadingComments}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedUser && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': openUserPost },
              )}
            >
              {openUserPost && selectedUserPost && (
                <div className="tile is-child box is-success ">

                  <PostDetails
                    selectedUserPost={selectedUserPost}
                    selectedUserPostId={selectedUserPostId}
                    isLoadingComments={isLoadingComments}
                    setIsLoadingComments={setIsLoadingComments}
                  />

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
