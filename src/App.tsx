import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as apiClient from './api/api';
import { User } from './types/User';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isNewCommentFormOpened, setIsNewCommentFormOpened] = useState(false);

  useEffect(() => {
    apiClient
      .getUsers()
      .then(setUsers)
      .catch(() => setIsErrorShown(true));
  }, []);

  const onUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsLoading(true);
    setIsErrorShown(false);
    setSelectedPost(null);

    apiClient
      .getUserPosts(user.id)
      .then(setUserPosts)
      .catch(() => setIsErrorShown(true))
      .finally(() => setIsLoading(false));
  };

  const onPostSelect = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);

    if (isNewCommentFormOpened) {
      setIsNewCommentFormOpened(false);
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
                  onUserSelect={onUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}
                {isErrorShown && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts.length === 0 && !isErrorShown && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts.length > 0 && !isLoading && !isErrorShown && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onPostSelect={onPostSelect}
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
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  isNewCommentFormOpened={isNewCommentFormOpened}
                  setIsNewCommentFormOpened={setIsNewCommentFormOpened}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
