import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsersFromServer } from './service/getUsers';
import { ErrorNotification } from './components/ErrorNotification';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  // #region states
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userIsLoading, setUserIsLoading] = useState(false);

  const [usersError, setUsersError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [addCommentError, setAddCommentError] = useState(false);

  const [, setDeleteError] = useState(false);

  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postInfoLoading, setPostInfoLoading] = useState(false);
  const [showPostInfo, setShowPostInfo] = useState(false);

  const [selectedComments, setSelectedComments] = useState<Comment[] | null>(
    null,
  );
  const [visibleComList, setVisibleComList] = useState<Comment[] | null>(null);
  const [newCommentPressed, setNewCommentPressed] = useState(false);

  //#endregion

  // #region useEffects
  // load all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const listOfUsers = (await getUsersFromServer()) as User[];

        setUsers(listOfUsers);
      } catch (error) {
        setUsersError(true);
      }
    };

    fetchUsers();
  }, []);

  // #endregion

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setUserPosts={setUserPosts}
                  setShowPostInfo={setShowPostInfo}
                  setUserIsLoading={setUserIsLoading}
                  setUsersError={setUsersError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && !usersError && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {userIsLoading && <Loader />}

                {(usersError || selectedUser) && (
                  <ErrorNotification
                    usersError={usersError}
                    userPosts={userPosts}
                    selectedUser={selectedUser}
                  />
                )}

                {userPosts !== null && userPosts.length > 0 && selectedUser && (
                  <PostsList
                    userPosts={userPosts}
                    showPostInfo={showPostInfo}
                    setShowPostInfo={setShowPostInfo}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    setSelectedComments={setSelectedComments}
                    setCommentsError={setCommentsError}
                    setNewCommentPressed={setNewCommentPressed}
                    setPostInfoLoading={setPostInfoLoading}
                    setVisibleComList={setVisibleComList}
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
              {
                'Sidebar--open':
                  showPostInfo && selectedPost?.userId === selectedUser?.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  selectedComments={selectedComments}
                  newCommentPressed={newCommentPressed}
                  setNewCommentPressed={setNewCommentPressed}
                  setSelectedComments={setSelectedComments}
                  setDeleteError={setDeleteError}
                  postInfoLoading={postInfoLoading}
                  commentsError={commentsError}
                  setAddCommentError={setAddCommentError}
                  addCommentError={addCommentError}
                  visibleComList={visibleComList}
                  setVisibleComList={setVisibleComList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
