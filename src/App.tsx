import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { TypeError } from './types/TypeError';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(uploadedUsers => setUsers(uploadedUsers))
      .catch(() => {
        throw new Error(TypeError.LoadUsers);
      });
  }, []);

  const selectedUserHandler = async (user: User) => {
    setIsError(false);
    setVisiblePosts(null);
    setSelectedPost(null);
    setSelectedUser(user);
    setIsLoading(true);
    const posts = await getPosts(user.id)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));

    if (posts && posts.length) {
      setVisiblePosts(posts);
    }
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
                  selectedUser={selectedUser}
                  selectUser={selectedUserHandler}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser ? (
                  <>
                    {isLoading && <Loader />}
                    {isError && !isLoading && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {visiblePosts && (
                      <PostsList
                        visiblePosts={visiblePosts}
                        selectedPost={selectedPost}
                        onOpen={setSelectedPost}
                      />
                    )}
                    {!visiblePosts && !isLoading && !isError && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}
                  </>

                ) : (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
