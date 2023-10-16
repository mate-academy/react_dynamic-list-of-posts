import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
  createNewComment: boolean,
  setCreateNewComment: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  createNewComment,
  setCreateNewComment = () => {},
}) => {
  const [createComment, setCreateComment] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setShowErrorMessage(false);

    getComments(selectedPost.id)
      .then(setCreateComment)
      .catch(() => setShowErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  const createNewCommentForm = () => {
    setCreateNewComment(true);
  };

  const handleDeleteComment = async (commentId: number) => {
    const temporaryComments = [...createComment];

    setCreateComment(prevComments => prevComments
      .filter(comment => comment.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch {
      setCreateComment(temporaryComments);
    }
  };

  const { id, title, body } = selectedPost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {showErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!isLoading && !showErrorMessage
            && createComment && createComment.length === 0) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!showErrorMessage && createComment && createComment.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {
                createComment.map(comment => {
                  const {
                    id: commentId,
                    name,
                    email,
                    body: commentBody,
                  } = comment;

                  return (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={commentId}
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${email}`}
                          data-cy="CommentAuthor"
                        >
                          {name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => handleDeleteComment(commentId)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {commentBody}
                      </div>
                    </article>
                  );
                })
              }
            </>
          )}

          {!showErrorMessage && (
            createNewComment
              ? (
                <NewCommentForm
                  postId={id}
                  setPostComments={setCreateComment}
                  setShowshowErrorMessage={setShowErrorMessage}
                />
              ) : (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={createNewCommentForm}
                >
                  Write a comment
                </button>
              )
          )}

        </div>

      </div>
    </div>
  );
};
