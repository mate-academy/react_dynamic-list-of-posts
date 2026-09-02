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
import { getPosts } from './api/posts';
import { Comment } from './types/Comment';
import { deleteComment, getComments } from './api/comments';
import { getUsers } from './api/users';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const [usersError, setUsersError] = useState(false);
  const [userPostsError, setUserPostsError] = useState(false);
  const [postCommentsError, setPostCommentsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  useEffect(() => {
    setSelectedPostId(null);
  }, [selectedUser]);

  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(() => {
        setUsersError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserPosts = (userId: number) => {
    setUserPostsError(false);
    setIsLoading(true);

    getPosts(userId)
      .then(setUserPosts)
      .catch(() => setUserPostsError(true))
      .finally(() => setIsLoading(false));
  };

  const loadPostComments = (postId: number) => {
    setPostCommentsError(false);
    setIsCommentsLoading(true);

    getComments(postId)
      .then(setPostComments)
      .catch(() => setPostCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  };

  const handleAddComment = (newComment: Comment) => {
    setPostComments(current => [...current, newComment]);
  };

  const handleDeleteComment = (commentId: number) => {
    const commentToDelete = postComments.find(c => c.id === commentId);

    if (!commentToDelete) {
      return;
    }

    deleteComment(commentId).then(() => {
      setPostComments(current =>
        current.filter(comment => comment.id !== commentId),
      );
    });
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    loadUserPosts(user.id);
    setUsersError(false);
  };

  const handleOpenSidebar = (postId: number) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const setCommentsError = (value: boolean) => {
    setPostCommentsError(value);
  };

  const selectedPost = userPosts.find(post => post.id === selectedPostId);

  const showNoPostMessage =
    selectedUser && !userPosts.length && !isLoading && !userPostsError;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setError={usersError}
                  userSelect={handleSelectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {(usersError || userPostsError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser !== null && !isLoading && !userPostsError && (
                  <PostsList
                    userPosts={userPosts}
                    selectPost={handleOpenSidebar}
                    selectedPostId={selectedPostId}
                    selectComments={loadPostComments}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                commentsError={postCommentsError}
                setCommentsError={setCommentsError}
                loadingComments={isCommentsLoading}
                postComments={postComments}
                onAdd={handleAddComment}
                onDelete={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
