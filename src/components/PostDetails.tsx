import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, Post } from '../types';
import { deleteComments, getComments } from '../api/dataFromServer';
import { Errors } from './Errors';
import { ErrorsDataCy } from '../types/ErrorsDataCy';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(ErrorsDataCy.Default);
  const [isFormShown, setIsFormShown] = useState(false);
  const { id, title, body } = post;

  useEffect(() => {
    setIsFormShown(false);
    setIsLoadingComments(true);
    getComments(id)
      .then(setComments)
      .catch(() => setCommentsError(ErrorsDataCy.CommentsError))
      .finally(() => setIsLoadingComments(false));
  }, [id]);

  const handleDeleteComments = async (commentId: number) => {
    try {
      await deleteComments(commentId);

      setComments(previousComments =>
        previousComments.filter(
          previousComment => previousComment.id !== commentId,
        ),
      );
    } catch {
      setCommentsError(ErrorsDataCy.CommentsError);
    }
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const isShowComments = !isLoadingComments && !commentsError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {commentsError && <Errors dataCy={commentsError} />}

          {isShowComments && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isShowComments && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={uuidv4()}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComments(comment.id)}
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
          )}
          {isShowComments && !isFormShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShown(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && (
          <NewCommentForm postId={post.id} onChangeComment={handleAddComment} />
        )}
      </div>
    </div>
  );
};
