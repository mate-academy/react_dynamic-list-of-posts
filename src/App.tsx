import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { getPosts } from './api/post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsLoadingError, setPostsLoadingError] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setPostsLoading(true);
    getPosts(selectedUser.id)
      .then(data => {
        setPosts(data as Post[]);
        setPostsLoadingError(false);
      })
      .catch(() => {
        setPostsLoadingError(true);
        setPosts(null);
      })
      .finally(() => setPostsLoading(false));
  }, [selectedUser]);

  const handlePostOpen = (newOpenPost: Post) => {
    if (newOpenPost === openedPost) {
      setOpenedPost(null);

      return;
    }

    setOpenedPost(newOpenPost);
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
                  onUserSelect={user => {
                    setSelectedUser(user);
                    setOpenedPost(null);
                  }}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {postsLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {postsLoadingError && (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        )}

                        {!postsLoadingError && !posts?.length && (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}
                        {!!posts?.length && (
                          <PostsList
                            posts={posts}
                            isPostOpen={openedPost}
                            onOpenPost={handlePostOpen}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': openedPost !== null,
            })}
          >
            <div className="tile is-child box is-success ">
              {openedPost !== null && <PostDetails postInfo={openedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
