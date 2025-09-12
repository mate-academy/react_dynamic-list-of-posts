import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';
import * as postsApi from './components/api/postApi';
import * as usersApi from './components/api/userApi';
import * as commentsApi from './components/api/commentApi';
import { User } from './types/User';
import { Comment, CommentData } from './types/Comment';
import { ErrorMesages } from './constants/ErrorMessages';
import classNames from 'classnames';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined,
  );
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [commentsErrorMessage, setCommentsErrorMessage] = useState<string>('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPostComments, setSelectedPostComments] = useState<Comment[]>(
    [],
  );
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    usersApi.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      setSelectedPostId(null);
      setUserPosts(null);
      setErrorMessage('');
      postsApi
        .getPostsByUserId(selectedUserId)
        .then(posts => {
          setUserPosts(posts);
        })
        .catch(() => {
          setErrorMessage(ErrorMesages.Load);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setCommentsErrorMessage('');
    setIsLoadingComments(true);
    setSelectedPostComments([]);
    commentsApi
      .getPostComments(selectedPostId)
      .then(setSelectedPostComments)
      .catch(() => {
        setCommentsErrorMessage(ErrorMesages.CommentsLoad);
      })
      .finally(() => setIsLoadingComments(false));
  }, [selectedPostId]);

  const handleCommentDelete = (commentId: number) => {
    const originalComments = selectedPostComments;

    setSelectedPostComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    commentsApi.deleteComment(commentId).catch(() => {
      setSelectedPostComments(originalComments);
      setCommentsErrorMessage(ErrorMesages.CommentsLoad);
    });
  };

  const handleAddComment = (commentData: CommentData): Promise<void> => {
    setCommentsErrorMessage('');
    setIsAddingComment(true);

    return commentsApi
      .addComment({ ...commentData, postId: selectedPostId! })
      .then(newComment => {
        setSelectedPostComments(prevComments => [...prevComments, newComment]);
      })
      .catch(error => {
        setCommentsErrorMessage(ErrorMesages.CommentsLoad);
        throw error;
      })
      .finally(() => setIsAddingComment(false));
  };

  const renderMainContent = () => {
    if (selectedUserId === undefined) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (isLoading === true) {
      return <Loader />;
    }

    if (errorMessage) {
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {errorMessage}
        </div>
      );
    }

    if (userPosts?.length === 0) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        userPosts={userPosts}
        setSelectedPostId={setSelectedPostId}
        selectedPostId={selectedPostId}
      />
    );
  };

  const selectedPost = userPosts?.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                  setLoading={setIsLoading}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {renderMainContent()}
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
              {selectedPostId !== null && selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isLoadingComments={isLoadingComments}
                  commentsErrorMessage={commentsErrorMessage}
                  comments={selectedPostComments}
                  onCommentDelete={handleCommentDelete}
                  onCommentAdd={handleAddComment}
                  isAddingComment={isAddingComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
