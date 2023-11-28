import React from 'react';
import classNames from 'classnames';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { PostsContext } from '../context/PostsContext';
import { User } from '../types/User';
import { getUserPosts } from '../api/PostsApi';
import { Post } from '../types/Post';

export const Main: React.FC = () => {
  const {
    selectedUser,
    userError,
    setUserError,
  } = React.useContext(PostsContext);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const noPostsMessageVisible = React.useMemo(() => (
    !isLoading
    && selectedUser
    && !userError
    && !posts.length
  ), [isLoading, posts.length, selectedUser, userError]);

  const onUserSelected = (user: User) => {
    setIsLoading(true);
    setPosts([]);
    setSelectedPost(null);
    setUserError(false);

    getUserPosts(user.id)
      .then(setPosts)
      .catch(() => {
        setUserError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector onUserSelected={onUserSelected} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {userError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsMessageVisible && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!!posts.length && (
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
