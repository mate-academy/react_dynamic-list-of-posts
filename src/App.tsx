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
import { Post } from './types/Post';
import * as Client from './api/client';

export const App = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    Client.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (userId === null) {
      setPosts([]);
      setOpenPostId(null);
      setError(false);
      setIsPostsLoading(false);

      return;
    }

    setIsPostsLoading(true);
    setError(false);
    setOpenPostId(null);

    Client.getPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setIsPostsLoading(false));
  }, [userId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  chosenUserId={userId}
                  toChooseUserId={setUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : error ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                ) : isPostsLoading ? (
                  <Loader />
                ) : posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    openPostId={openPostId}
                    setOpenPostId={setOpenPostId}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': openPostId !== null,
            })}
          >
            {openPostId && (
              <div className="tile is-child box is-success ">
                <PostDetails postId={openPostId} posts={posts} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
