/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setSelectedPost(null);

      return;
    }

    setIsPostsLoading(true);
    setPostsError(false);
    setPosts([]);
    setSelectedPost(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(setPosts)
      .catch(() => {
        setPostsError(true);
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUser]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(currentPost =>
      currentPost?.id === post.id ? null : post,
    );
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
                  onSelect={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isPostsLoading && <Loader />}

                {selectedUser && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser &&
                  !isPostsLoading &&
                  !postsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !isPostsLoading &&
                  !postsError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      onSelect={handleSelectPost}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
