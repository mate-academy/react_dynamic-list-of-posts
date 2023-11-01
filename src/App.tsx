import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getPosts } from './services/getPostsByUserIS';
import { Post } from './types/Post';
import { getUsers } from './services/users';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [errorLoadUsers, setErrorLoadingUsers] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [messageHasNotPosts, setMessageHasNotPosts] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectPost, setSelecedPost] = useState<Post | null>(null);
  const [openedSideBar, setOpenedSidebar] = useState(false);
  const [openedCommentForm, setOpenedCommentForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setErrorLoadingUsers('Unable to load users.'));
  }, []);

  useEffect(() => {
    if (selectUser?.id) {
      setErrorMessage('');
      setMessageHasNotPosts('');

      setLoadingPosts(true);
      getPosts(selectUser.id)
        .then((pOsts: Post[]) => {
          if (pOsts.length === 0) {
            setMessageHasNotPosts('No posts yet');
          } else {
            setPosts(pOsts);
          }
        })
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoadingPosts(false));
    }
  }, [selectUser?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelectUser={setSelectUser}
                  selectUser={selectUser}
                  setOpenedSidebar={setOpenedSidebar}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {
                  !selectUser && !errorLoadUsers && (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                }

                {errorLoadUsers && (
                  <div className="notification is-danger">
                    {errorLoadUsers}
                  </div>
                )}

                {
                  loadingPosts && (
                    <Loader />
                  )
                }

                {
                  errorMessage && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      {errorMessage}
                    </div>
                  )
                }

                {
                  messageHasNotPosts && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      {messageHasNotPosts}
                    </div>
                  )
                }

                {
                  (
                    !errorMessage
                    && !loadingPosts
                    && !messageHasNotPosts
                    && selectUser
                  ) && (
                    <PostsList
                      selectPost={selectPost}
                      posts={posts}
                      onSelectedPost={setSelecedPost}
                      openedSidebar={openedSideBar}
                      setOpenedSidebar={setOpenedSidebar}
                      setOpenedCommentForm={setOpenedCommentForm}
                    />
                  )
                }
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={openedSideBar && selectPost
              ? 'tile is-parent is-8-desktop Sidebar Sidebar--open'
              : 'tile is-parent is-8-desktop Sidebar'}
          >
            <div className="tile is-child box is-success ">
              {
                openedSideBar && (
                  <PostDetails
                    post={selectPost}
                    setOpenedCommentForm={setOpenedCommentForm}
                    openedCommentForm={openedCommentForm}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
