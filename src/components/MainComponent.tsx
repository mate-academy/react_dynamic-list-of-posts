import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { UserSelector } from './UserSelector';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUserPosts } from '../utils/api';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { ERROR_MESSAGE } from '../variables';

export const MainComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [choosedUser, setChoosedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [choosedPost, setChoosedPost] = useState<Post | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (choosedUser) {
      getUserPosts(choosedUser.id)
        .then(setPosts)
        .catch(() => setErrorMessage(`${ERROR_MESSAGE}!`))
        .finally(() => setIsLoading(false));
    }
  }, [choosedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setIsOpened={setIsOpened}
                  users={users}
                  setUsers={setUsers}
                  choosedUser={choosedUser}
                  setChoosedUser={setChoosedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!choosedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && choosedUser && <Loader />}

                {errorMessage
                  && !isLoading
                  && !isOpened
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      {errorMessage}
                    </div>
                  )}

                {choosedUser
                  && !errorMessage
                  && !posts.length
                  && !isLoading
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!!posts.length
                  && !errorMessage
                  && !isLoading
                  && (
                    <PostsList
                      posts={posts}
                      setIsOpened={setIsOpened}
                      isOpened={isOpened}
                      choosedPost={choosedPost}
                      setChoosedPost={setChoosedPost}
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
              { 'Sidebar--open': isOpened },
            )}
          >
            <div className="tile is-child box is-success ">
              {isOpened && (
                <PostDetails
                  key={choosedPost?.id}
                  choosedPost={choosedPost}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
