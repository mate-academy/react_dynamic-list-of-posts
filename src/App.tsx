import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { getComments, addComment, deleteComment } from './api/comments';
import { Comment, CommentData } from './types/Comment';
import { Post } from './types/Post';
import { User } from './types/User';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isPostComment, setIsPostComment] = useState<boolean>(false);
  const [isError, setIsError] = useState<ErrorType>(ErrorType.NONE);
  const [isCommentError, setIsCommentError] = useState<ErrorType>(
    ErrorType.NONE,
  );

  const noPostsYet = useMemo(() => {
    return !posts.length && selectedUser
      && !isLoading && !isError;
  }, [posts, isLoading, isError]);

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(setUsers)
      .catch(() => setIsError(ErrorType.USERS))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (!selectedUser) {
      setPosts([]);
      setIsLoading(false);

      return;
    }

    getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setIsError(ErrorType.POSTS))
      .finally(() => setIsLoading(false));
  }, [selectedUser]);

  const handleSelectedUser = useCallback((user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  }, []);

  const handleSelectedPost = useCallback((post: Post | null) => {
    if (selectedPost?.id === post?.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post || null);
  }, [posts, selectedPost]);

  useEffect(() => {
    setIsLoadingComments(true);

    if (!selectedPost) {
      setComments([]);
      setIsLoading(false);

      return;
    }

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setIsCommentError(ErrorType.COMMENTS))
      .finally(() => setIsLoadingComments(false));
  }, [selectedPost]);

  const handleAddComment = (data: CommentData) => {
    setIsPostComment(true);

    addComment(data)
      .then((newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
      })
      .catch(() => setIsCommentError(ErrorType.ADDCOMMENT))
      .finally(() => setIsPostComment(false));
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments((prevComments) => prevComments
          .filter((comment) => comment.id !== commentId));
      })
      .catch(() => setIsCommentError(ErrorType.DELETECOMMENT));
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
                  onSelectedUser={handleSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {isError}
                  </div>
                )}

                {noPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && !isLoading && !isError && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelectPost={handleSelectedPost}
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
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  isCommentError={isCommentError}
                  onAddComment={handleAddComment}
                  isPostComment={isPostComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
