import classNames from 'classnames';

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
import { client } from './utils/fetchClient';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(loaderUsers => setUsers(loaderUsers))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedUserId === null) {
      return;
    }

    setSelectedPost(null);
    setIsPostLoading(true);
    setIsPostsError(false);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(loaderPosts => setPosts(loaderPosts))
      .catch(() => {
        setIsPostsError(true);
      })
      .finally(() => {
        setIsPostLoading(false);
      });
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelect={id => setSelectedUserId(id)}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId !== null && (
                  <>
                    {isPostLoading && <Loader />}

                    {!isPostLoading && (
                      <>
                        {isPostsError && (
                          <div
                            className="notification is-danger"
                            data-cy="PostsLoadingError"
                          >
                            Something went wrong!
                          </div>
                        )}

                        {!isPostsError && posts.length === 0 && (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}

                        {!isPostsError && posts.length > 0 && (
                          <PostsList
                            posts={posts}
                            selectedPostId={selectedPost?.id ?? null}
                            onSelectPost={post =>
                              setSelectedPost(current =>
                                current?.id === post.id ? null : post,
                              )
                            }
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
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': selectedPost,
            })}
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
