import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';

import { User } from './types/User';
import { Post } from './types/Post';

interface PostsState {
  items: Post[];
  isLoading: boolean;
  hasError: boolean;
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasUsersError, setHasUsersError] = useState<boolean>(false);
  const [selection, setSelection] = useState({
    userId: null as number | null,
    postId: null as number | null,
  });

  const { userId: selectedUserId, postId: selectedPostId } = selection;

  const [postsState, setPostsState] = useState<PostsState>({
    items: [],
    isLoading: false,
    hasError: false,
  });

  const { items: posts, isLoading, hasError: hasPostsError } = postsState;

  const selectedPost = posts.find(post => post.id === selectedPostId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const dataUsers: User[] = await client.get('/users');

        setUsers(dataUsers);
      } catch (error) {
        setHasUsersError(true);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (hasUsersError || selectedUserId === null) {
      return;
    }

    setPostsState({
      items: [],
      isLoading: true,
      hasError: false,
    });

    const fetchPosts = async () => {
      try {
        const dataPosts: Post[] = await client.get(
          `/posts?userId=${selectedUserId}`,
        );

        setPostsState({
          items: dataPosts,
          isLoading: false,
          hasError: false,
        });
      } catch {
        setPostsState({
          items: [],
          isLoading: false,
          hasError: true,
        });
      }
    };

    fetchPosts();
  }, [hasUsersError, selectedUserId]);

  const handleUserSelect = (userId: number) => {
    setSelection({
      userId,
      postId: null,
    });
  };

  const handlePostSelect = (postId: number | null) => {
    setSelection(prev => ({
      ...prev,
      postId,
    }));
  };

  const shouldShowNoPosts =
    selectedUserId !== null &&
    !isLoading &&
    !hasPostsError &&
    posts.length === 0;

  const shouldShowPosts = posts.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  usersList={users}
                  currentUser={selectedUserId}
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPosts && (
                  <PostsList
                    postsList={posts}
                    onPostSelect={handlePostSelect}
                    selectedPostId={selectedPostId}
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
              { 'Sidebar--open': selectedPostId },
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
