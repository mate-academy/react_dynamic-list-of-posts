import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(0);
  const [isErorrPostLoading, setIsErorrPostLoading] = useState(false);
  const [isNewCommentFormOpened, setIsNewCommentFormOpened] = useState(false);

  const loadUsers = async () => {
    try {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    } catch {
      throw new Error('Can\'t load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async (userId: number) => {
    try {
      setIsLoading(true);
      const loadedPosts = await getPosts(userId);

      setPosts(loadedPosts);
    } catch {
      setIsErorrPostLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(selectedUserId);
  }, [selectedUserId]);

  const selectUserId = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  const selectPostId = useCallback((postId: number | null) => {
    setSelectedPostId(prev => (prev !== postId ? postId : 0));
    setIsNewCommentFormOpened(false);
  }, []);

  const isNoPostYet = selectedUserId !== 0 && posts.length === 0 && !isLoading;
  const isVisiblePost = selectedUserId !== 0 && posts.length > 0;
  const isVisibleSidebar = selectedPost?.userId === selectedUserId;

  const onNewCommentFormOpened = useCallback(() => {
    setIsNewCommentFormOpened(true);
  }, []);

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
                  onSelectUserId={selectUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isErorrPostLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isVisiblePost && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPostId={selectPostId}
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
              { 'Sidebar--open': isVisibleSidebar },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  selectedPost={selectedPost}
                  isNewCommentFormOpened={isNewCommentFormOpened}
                  onNewCommentFormOpened={onNewCommentFormOpened}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};
