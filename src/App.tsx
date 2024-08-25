import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const [openPost, setOpenPost] = useState<Post | null>(null);

  useEffect(() => {
    setPosts([]);
    setOpenPost(null);
    if (selectUser) {
      setIsLoading(true);
      getPosts(selectUser.id)
        .then((data: Post[]) => {
          setPosts(data);
          setIsError(false);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onSetSelectUser={setSelectUser}
                  selectUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectUser && !isLoading && !posts.length && !isError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onSetOpenPost={setOpenPost}
                    openPost={openPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': openPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {openPost && <PostDetails post={openPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
