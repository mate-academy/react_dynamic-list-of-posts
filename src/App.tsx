import { useState, FC, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';

export const App: FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [postLoadingFail, setPostLoadingFail] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    setSelectedPost(undefined);

    if (selectedUser) {
      setIsLoading(true);
      setPostLoadingFail(false);
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setPostLoadingFail(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const showPostTost =
    !posts.length && !isLoading && selectedUser && !postLoadingFail;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector setSelectedUser={setSelectedUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}
                {postLoadingFail && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showPostTost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && !isLoading && (
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
