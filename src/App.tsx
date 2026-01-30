import classNames from 'classnames';
import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers, getUserPosts } from './api/api';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  const handleUserSelect = (user: User) => {
    if (selectedUser?.id === user.id) {
      return;
    }

    setSelectedUser(user);

    setPosts([]);
    setPostsError(false);
    setSelectedPost(null);
    setIsLoadingPosts(true);

    getUserPosts(user.id)
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
      })
      .catch(() => {
        setPostsError(true);
      })
      .finally(() => setIsLoadingPosts(false));
  };

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isActive={isDropDownActive}
                  onToggle={() => setIsDropDownActive(!isDropDownActive)}
                  users={users}
                  selectedUser={selectedUser}
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {isLoadingPosts && <Loader />}

                    {!isLoadingPosts && postsError && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )}

                    {!isLoadingPosts && !postsError && posts.length === 0 && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {!isLoadingPosts && !postsError && posts.length > 0 && (
                      <PostsList
                        posts={posts}
                        selectedPostId={selectedPost?.id}
                        onSelect={handleSelectPost}
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
                'Sidebar--open': selectedPost !== null,
              },
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
