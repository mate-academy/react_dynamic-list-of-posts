import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as postsService from './api/api';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    postsService
      .getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setSelectedPost(null);
    setArePostsLoading(true);
    setUserPosts(null);
    postsService
      .getUserPosts(selectedUser.id)
      .then(posts => setUserPosts(posts))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setArePostsLoading(false));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsCommentsLoading(true);
    setPostComments(null);
    postsService
      .getPostComments(selectedPost.id)
      .then(comments => setPostComments(comments))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsCommentsLoading(false));
  }, [selectedPost]);

  const handleAddComment = (newComment: Comment) => {
    setPostComments(prevComments =>
      prevComments ? [...prevComments, newComment] : [newComment],
    );
  };

  const handleTogglePost = (post: Post) => {
    setSelectedPost(prev => (prev?.id === post.id ? null : post));
  };

  const removeCommentById = (commentId: number) => {
    setPostComments(
      comments => comments?.filter(comment => comment.id !== commentId) || null,
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
                  onSelect={setSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}
                {arePostsLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser &&
                  !arePostsLoading &&
                  (userPosts && userPosts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      userPosts={userPosts ?? []}
                      onTogglePost={handleTogglePost}
                      currentSelectedPostId={
                        selectedPost ? selectedPost.id : null
                      }
                    />
                  ))}
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
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  errorMessage={errorMessage}
                  postComments={postComments}
                  isCommentsLoading={isCommentsLoading}
                  onAddComment={handleAddComment}
                  removeCommentById={removeCommentById}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
