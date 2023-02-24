import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { TypeError } from '../types/TypeError';
import { getComments, deleteComment } from '../api/comments';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState('');
  const [isFormAddComment, setIsFormAddComment] = useState(false);
  const [commentIdWithError, setCommentIdWithError]
  = useState<number | null>(null);

  const addingComment = async (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const onWriteComment = () => {
    setIsError('');
    setCommentIdWithError(null);
    setIsFormAddComment(true);
  };

  const deleteHandler = (commentId: number) => () => {
    const currentComments = comments;

    setIsError('');
    setCommentIdWithError(null);
    setComments(comments.filter(comment => comment.id !== commentId));
    deleteComment(commentId)
      .catch(() => {
        setComments(currentComments);
        setCommentIdWithError(commentId);
        setIsError(TypeError.Delete);
      });
  };

  useEffect(() => {
    setIsFormAddComment(false);
    setComments([]);
    setIsLoading(true);
    setIsError('');
    getComments(post.id)
      .then((loadedComments) => setComments(loadedComments))
      .catch(() => setIsError(TypeError.Unexpected))
      .finally(() => setIsLoading(false));
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError === TypeError.Unexpected && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  {isError === TypeError.Delete
                  && commentIdWithError === comment.id
                  && (
                    <div>
                      <p className="help is-danger">
                        {TypeError.Delete}
                      </p>
                    </div>
                  )}
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={deleteHandler(comment.id)}
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

          {!isLoading
          && isError !== TypeError.Unexpected
          && !isFormAddComment
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={onWriteComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormAddComment && (
          <NewCommentForm
            addingComment={addingComment}
            postId={post.id}
            isError={isError}
            setIsError={setIsError}
          />
        )}
      </div>
    </div>
  );
};
