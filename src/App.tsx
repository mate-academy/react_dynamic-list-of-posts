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
  const [selectedUserId, setSelectedUser] = useState('');
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);
  const [openUserPost, setOpenUserPost] = useState(false);
  const [selectedUserPost, setSelectedUserPost] = useState<Post>();
  const [selectedUserPostId, setSelectedUserPostId] = useState(0);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[] | []>([]);
  const [failedToFetch, setFailedToFetch] = useState(false);
  const [writeComment, setWriteComment] = useState(false);

  const loadUsersFromServer = useCallback(
    async () => {
      try {
        setFailedToFetch(false);
        const todosFromServer = await getUsers();

        setUsersArray(todosFromServer);
      } catch (error) {
        setFailedToFetch(true);
      }
    }, [],
  );

  useEffect(() => {
    loadUsersFromServer();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersArray={usersArray}
                  selectedUserId={selectedUserId}
                  setIsLoadingUserPosts={setIsLoadingUserPosts}
                  setSelectedUser={setSelectedUser}
                  setOpenUserPost={setOpenUserPost}
                  setWriteComment={setWriteComment}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && !failedToFetch && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingUserPosts && <Loader />}

                {failedToFetch && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId && !isLoadingUserPosts
                  && selectedUserPosts.length === 0 && !failedToFetch && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {selectedUserId && (
                  <PostsList
                    selectedUserId={selectedUserId}
                    openUserPost={openUserPost}
                    setOpenUserPost={setOpenUserPost}
                    setSelectedUserPost={setSelectedUserPost}
                    selectedUserPostId={selectedUserPostId}
                    setSelectedUserPostId={setSelectedUserPostId}
                    setIsLoadingComments={setIsLoadingComments}
                    setWriteComment={setWriteComment}
                    selectedUserPosts={selectedUserPosts}
                    setSelectedUserPosts={setSelectedUserPosts}
                    isLoadingUserPosts={isLoadingUserPosts}
                    setIsLoadingUserPosts={setIsLoadingUserPosts}
                    setFailedToFetch={setFailedToFetch}
                    failedToFetch={failedToFetch}
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
              { 'Sidebar--open': openUserPost },
            )}
          >
            {selectedUserId && openUserPost && selectedUserPost && (
              <div className="tile is-child box is-success ">

                <PostDetails
                  selectedUserPost={selectedUserPost}
                  selectedUserPostId={selectedUserPostId}
                  isLoadingComments={isLoadingComments}
                  setIsLoadingComments={setIsLoadingComments}
                  writeComment={writeComment}
                  setWriteComment={setWriteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
