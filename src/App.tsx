import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUserPosts } from './api/post';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setUsers([]);
      });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    let active = true;

    setIsPostsLoading(true);
    setHasPostsError(false);
    setPosts([]);

    getUserPosts(selectedUser.id)
      .then(loadedPosts => {
        if (active) {
          setPosts(loadedPosts);
        }
      })
      .catch(() => {
        if (active) {
          setHasPostsError(true);
        }
      })
      .finally(() => {
        if (active) {
          setIsPostsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    if (user.id === selectedUser?.id) {
      return;
    }

    setSelectedUser(user);
    setSelectedPost(null);
    setPosts([]);
    setHasPostsError(false);
    setIsPostsLoading(true);
  };

  const handlePostSelect = (post: Post) => {
    setSelectedPost(currentPost => {
      if (currentPost?.id === post.id) {
        return null;
      }

      return post;
    });
  };

  const showPosts =
    selectedUser && !isPostsLoading && !hasPostsError && posts.length > 0;
  const showNoPosts =
    selectedUser && !isPostsLoading && !hasPostsError && posts.length === 0;

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
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isPostsLoading && <Loader />}

                {selectedUser && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPosts && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id ?? null}
                    onSelect={handlePostSelect}
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
                <PostDetails key={selectedPost.id} post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
