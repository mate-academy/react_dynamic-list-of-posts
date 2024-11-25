import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { getPosts } from './api/api';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  const selectUser = (user: User) => {
    setOpenedPost(null);
    setPosts([]);
    setSelectedUser(user);
  };

  const loadPost = () => {
    if (selectedUser && !isError) {
      setIsLoading(true);

      getPosts(selectedUser.id)
        .then(result => {
          const results = result.map(post => ({
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body,
          }));

          setPosts(results);
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    loadPost();
  }, [selectedUser, isError]);

  const chosePost = (post: Post | null) => {
    setOpenedPost(post);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onSelectUser={selectUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {isError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {posts.length === 0 && selectedUser && !isError && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        onOpenSideBar={chosePost}
                        openedPost={openedPost}
                      />
                    )}
                  </>
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
                'Sidebar--open': openedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {openedPost && <PostDetails post={openedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
