import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getPosts, getUsers } from './utils/servicesPost';
import { Post } from './types/Post';
import { CommentsState } from './types/CommentState';

export type OpenState = {
  postId: number | null;
};

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorPosts, setErrorPosts] = useState(false);
  const [errorComments, setErrorComments] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [openOrCloseMenu, setOpenOrCloseMenu] = useState(false);
  const [comments, setComments] = useState<CommentsState>({});
  const [openMenu, setOpenMenu] = useState<OpenState>({ postId: null });

  useEffect(() => {
    getUsers().then(result => {
      setUsers(result);
    });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingPost(true);
      setPosts([]);

      getPosts(selectedUser?.id)
        .then(result => {
          setPosts(result);
          setErrorPosts(false);
        })
        .catch(() => {
          setErrorPosts(true);
        })
        .finally(() => {
          setLoadingPost(false);
        });
    }
  }, [selectedUser]);

  const currentPost = useMemo(() => {
    return posts.find(post => post.id === openMenu.postId) ?? null;
  }, [openMenu.postId, posts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setOpenOrCloseMenu={setOpenOrCloseMenu}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPost && <Loader />}

                {errorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && selectedUser && !errorPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUser && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    setComments={setComments}
                    setOpenOrCloseMenu={setOpenOrCloseMenu}
                    setOpenMenu={setOpenMenu}
                    openMenu={openMenu}
                    setLoadingComments={setLoadingComments}
                    setErrorComments={setErrorComments}
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
                'Sidebar--open': openOrCloseMenu,
                'Sidebar--close': !openOrCloseMenu,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {openMenu.postId !== null && currentPost && (
                <PostDetails
                  key={openMenu.postId}
                  comments={comments[openMenu.postId]}
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  post={currentPost!}
                  errorComments={errorComments}
                  loadingComments={loadingComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
