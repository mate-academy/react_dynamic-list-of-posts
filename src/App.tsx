import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';

import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './utils/users';
import { getUserPosts } from './utils/posts';
import { Post } from './types/Post';
import { errorMessage } from './utils/errorMessage';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleClickOnUser = (clickedUser: User) => {
    setUser(clickedUser);
    setPosts([]);
    setIsPending(true);
    setSelectedPost(null);

    getUserPosts(clickedUser.id)
      .then(setPosts)
      .catch(() => {
        setIsFail(true);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const handleClickOnPost = (post: Post) => {
    setSelectedPost(currentPost => (currentPost?.id === post.id ? null : post));
    setAreCommentsLoading(true);
    setIsForm(false);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setUser={handleClickOnUser}
                  users={users}
                  choosedUser={user}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(user && !!posts.length) && (
                  <PostsList
                    posts={posts}
                    onClick={handleClickOnPost}
                    selectedPost={selectedPost}
                  />
                )}

                {isPending && (
                  <Loader />
                )}

                {isFail && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {(user && !posts.length && !isPending) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  areCommentsLoading={areCommentsLoading}
                  setAreCommentsLoading={setAreCommentsLoading}
                  isForm={isForm}
                  setIsForm={setIsForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
