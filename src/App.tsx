import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { UserSelector } from './components/UserSelector';
import { useUser } from './hooks/useUser';
import { usePosts } from './hooks/usePosts';
import { PostsList } from './components/PostsList';
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import cn from 'classnames';
import { PostDetails } from './components/PostDetails';
import { useComments } from './hooks/useComments';

export const App = () => {
  const { users } = useUser();

  const {
    posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
    getPostsFromServer,
  } = usePosts();

  const {
    getCommentsFromServer,
    comments,
    isLoading: isLoadingComments,
    error: errorComments,
    deleteComment,
    addComment,
    isLoadingForAdd,
  } = useComments();

  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const isUserSelected = selectedPerson !== null;
  const isPostSelected = selectedPost !== null;

  useEffect(() => {
    setIsFormVisible(false);
  }, [selectedPost]);

  const shouldShowNoPostsYet =
    isUserSelected &&
    posts.length === 0 &&
    !isLoadingPosts &&
    errorPosts === null;

  const shouldShowPostsList =
    isUserSelected && posts.length > 0 && !isLoadingPosts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  getPostsFromServer={getPostsFromServer}
                  selectedPerson={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                  setSelectedPost={setSelectedPost}
                  setIsFormVisible={setIsFormVisible}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {errorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorPosts}
                  </div>
                )}

                {shouldShowNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPostsList && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                    getCommentsFromServer={getCommentsFromServer}
                    setIsFormVisible={setIsFormVisible}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': isPostSelected,
            })}
          >
            <div className="tile is-child box is-success ">
              {isPostSelected && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  errorComments={errorComments}
                  deleteComment={deleteComment}
                  isFormVisible={isFormVisible}
                  setIsFormVisible={setIsFormVisible}
                  addComment={addComment}
                  isLoadingForAdd={isLoadingForAdd}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
