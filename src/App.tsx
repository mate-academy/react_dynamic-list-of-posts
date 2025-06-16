import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import * as clientApi from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clientApi
      .getUsers()
      .then(setUserData)
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (user === null) {
      return;
    }

    setPosts(null);
    setSelectedPost(null);
    setIsError(false);
    setIsLoading(true);

    clientApi
      .getUserPosts(user.id)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [user]);

  const isEmpty = !isError && posts && !posts.length;
  const isPosts = !isError && posts && !!posts.length;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  userData={userData}
                  user={user}
                  setUser={setUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isEmpty && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPosts && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
