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
import { useUsers } from './hooks/useUsers';
import { usePosts } from './hooks/usePosts';
import { useComments } from './hooks/useComments';

export const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [writeComment, setWriteComment] = useState(false);

  const { users } = useUsers();

  const {
    posts,
    isLoading: postsLoading,
    hasError: postsError,
  } = usePosts(selectedUser?.id ?? null);

  const {
    comments,
    isLoading: commentsLoading,
    hasError: commentsError,
    deleteComment,
    addComment,
    isAdding,
  } = useComments(selectedPostId);

  const showNoPosts = !postsLoading && selectedUser && posts.length === 0;

  const selectedPost = posts.find(post => post.id === selectedPostId) ?? null;

  const handleUserSelect = (user: User | null) => {
    setSelectedUser(user);
    setSelectedPostId(null);
  };

  useEffect(() => {
    setWriteComment(false);
  }, [selectedPostId]);

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
                  onSelectedUser={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && !postsError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!postsLoading && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onTogglePost={setSelectedPostId}
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
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                comments={comments}
                isLoading={commentsLoading}
                hasError={commentsError}
                writeComment={writeComment}
                onWriteComment={setWriteComment}
                onDeleteComment={deleteComment}
                addComment={addComment}
                isAdding={isAdding}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
