/* eslint-disable @typescript-eslint/indent */
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useEffect, useState } from 'react';
import { deleteComment, getPostComments, postNewComment } from '../api/users';
import { Comment, CommentData } from '../types/Comment';

type PostDetailsProps = {
  selectedPost: Post | null;
};

export const PostDetails = ({ selectedPost }: PostDetailsProps) => {
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [commentsErrorMessage, setCommentsErrorMessage] = useState<string>('');
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [showWriteComment, setShowWriteComment] = useState<boolean>(true);
  const [loadingFormSubmit, setLoadingFormSubmit] = useState<boolean>(false);

  useEffect(() => {
    setCommentsErrorMessage('');

    if (selectedPost) {
      setLoadingComments(true);

      getPostComments(selectedPost.id)
        .then(setPostComments)
        .catch(() => setCommentsErrorMessage('Something went wrong'))
        .finally(() => {
          setLoadingComments(false);
        });
    }
  }, [selectedPost]);

  const handleDeleteComment = (commentDeleted: Comment) => {
    if (commentDeleted) {
      setPostComments(
        postComments.filter(comment => {
          if (comment.id !== commentDeleted.id) {
            return true;
          } else {
            return false;
          }
        }),
      );

      deleteComment(commentDeleted.id);
    }
  };

  const handleWriteComment = () => {
    setShowWriteComment(prev => !prev);
  };

  const handleNewComment = (name: string, email: string, body: string) => {
    const newComment: CommentData = { name, email, body };

    if (selectedPost) {
      setLoadingFormSubmit(true);

      postNewComment(newComment, selectedPost.id)
        .then(comment => {
          setPostComments(prev => [...prev, comment]);
        })
        .finally(() => {
          setLoadingFormSubmit(false);
        });
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loadingComments ? (
            <Loader />
          ) : commentsErrorMessage ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsErrorMessage}
            </div>
          ) : postComments && postComments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : postComments && postComments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>
              {postComments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          ) : null}

          {showWriteComment &&
            selectedPost !== null &&
            !loadingComments &&
            !commentsErrorMessage && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleWriteComment}
              >
                Write a comment
              </button>
            )}
        </div>

        {!showWriteComment && (
          <NewCommentForm
            onNewComment={handleNewComment}
            loadingFormSubmit={loadingFormSubmit}
          />
        )}
      </div>
    </div>
  );
};
