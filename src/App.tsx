import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import * as userService from './api/user.service';
import * as postService from './api/post.service';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import * as commentService from './api/comment.service';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isAddingCommentFailed, setIsAddingCommentFailed] = useState(false);
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [commentsLoadingErrorMessages, setCommentsLoadingErrorMessages] =
    useState('');
  const [isWritingComment, setIsWritingComment] = useState(false);

  useEffect(() => {
    userService.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!chosenUser) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    postService
      .getUserPosts(chosenUser.id)
      .then(setPosts)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [chosenUser]);

  const handleUserChose = (user: User) => {
    if (chosenUser?.id === user.id) {
      return;
    }

    setChosenUser(user);
    setOpenedPost(null);
    setIsPostDetailsOpen(false);
    setPosts([]);
    setVisibleComments([]);
    setComments([]);
    setIsCommentsLoading(false);
    setIsAddingComment(false);
    setIsAddingCommentFailed(false);
    setErrorMessage('');
  };

  const handlePostOpening = (post: Post | null) => {
    if (!post) {
      setIsPostDetailsOpen(false);
      setOpenedPost(null);

      return;
    }

    setIsCommentsLoading(true);
    setIsPostDetailsOpen(true);
    setOpenedPost(post);
    setIsWritingComment(false);

    commentService
      .getPostComments(post.id)
      .then(receivedComments => {
        setVisibleComments(receivedComments);
        setComments(receivedComments);
      })
      .catch(() => setCommentsLoadingErrorMessages('Something went wrong'))
      .finally(() => {
        setIsCommentsLoading(false);
      });
  };

  const isErrorNotificationVisible =
    posts.length === 0 && chosenUser && !errorMessage && !isLoading;

  const handleCommentDelete = (commentId: number) => {
    setVisibleComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    commentService
      .deleteComment(commentId)
      .then(() => {})
      .catch(() => {
        setVisibleComments(() => [...comments]);
        setErrorMessage('Something went wrong');
      });
  };

  const handleCommentAdded = (newComment: CommentData) => {
    setIsAddingComment(true);

    commentService
      .addComment({
        postId: openedPost!.id,
        body: newComment.body,
        email: newComment.email,
        name: newComment.name,
      })
      .then(comment => {
        setComments(prevComments => [...prevComments, comment]);
        setVisibleComments(prevComments => [...prevComments, comment]);
      })
      .catch(() => setIsAddingCommentFailed(true))
      .finally(() => setIsAddingComment(false));
  };

  const handleCommentWriteButtonClick = () => {
    setIsWritingComment(true);
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
                  chosenUser={chosenUser}
                  onUserChose={handleUserChose}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!chosenUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isErrorNotificationVisible && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    handlePostOpening={handlePostOpening}
                    chosenPostId={openedPost?.id}
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
              { 'Sidebar--open': isPostDetailsOpen },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                comments={visibleComments}
                isCommentsLoading={isCommentsLoading}
                isAddingCommentFailed={isAddingCommentFailed}
                post={openedPost}
                onCommentAdded={handleCommentAdded}
                onCommentDeleted={handleCommentDelete}
                isAddingComment={isAddingComment}
                commentsLoadingErrorMessages={commentsLoadingErrorMessages}
                onCommentWriteButtonCLick={handleCommentWriteButtonClick}
                isWritingComment={isWritingComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
