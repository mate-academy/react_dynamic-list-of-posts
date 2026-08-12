import { useState, useCallback } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Notification } from './components/Notification';
import { Post } from './types/Post';
import { ErrorType } from './Enums/Error';
// import { getPostsByUser } from './api/posts';
import { client } from './utils/fetchClient';

type PostsState = {
  items: Post[];
  isLoading: boolean;
  error: string;
};

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [usersError, setUsersError] = useState('');
  const [postsState, setPostsState] = useState<PostsState>({
    items: [],
    isLoading: false,
    error: '',
  });

  const {
    items: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = postsState;

  const updatePostsState = useCallback((updates: Partial<PostsState>) => {
    setPostsState(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const loadPosts = useCallback(
    (userId: number) => {
      updatePostsState({ items: [], isLoading: true, error: '' });
      // getPostsByUser(userId)
      client
        .get<Post[]>(`/posts?userId=${userId}`)
        .then(fetchedPosts => {
          updatePostsState({ items: fetchedPosts, isLoading: false });
        })
        .catch(() => {
          updatePostsState({
            items: [],
            isLoading: false,
            error: ErrorType.UNEXPECTED,
          });
        });
    },
    [updatePostsState],
  );

  const handleUserSelect = useCallback(
    (userId: number) => {
      if (selectedUserId === userId) {
        return;
      }

      setSelectedPost(null);
      setSelectedUserId(userId);
      loadPosts(userId);
    },
    [selectedUserId, loadPosts],
  );

  const handlePostSelect = useCallback(
    (post: Post | null) => {
      if (post?.id === selectedPost?.id) {
        return;
      }

      setSelectedPost(post);
    },
    [selectedPost],
  );

  const handleUsersError = useCallback((error: string) => {
    setUsersError(error);
  }, []);

  const hasPosts = posts.length > 0;

  const noPosts =
    !!selectedUserId && !isPostsLoading && !postsError && !hasPosts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {usersError && (
                  <Notification message={usersError} color={'is-danger'} />
                )}
                <UserSelector
                  selectedUserId={selectedUserId}
                  onSelect={handleUserSelect}
                  onError={handleUsersError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {postsError && (
                  <Notification
                    message={postsError}
                    color={'is-danger'}
                    dataCy="PostsLoadingError"
                  />
                )}

                {noPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
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
              selectedPost && 'Sidebar--open',
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
