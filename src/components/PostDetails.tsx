/* eslint-disable react/display-name */
import { memo, useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  getCommentsByPostId,
  postComment,
  removeComment,
} from '../services/comments';
import { Comment, CommentData } from '../types/Comment';

interface Props {
  post: Post;
}

export const PostDetails = memo((props: Props) => {
  const { post } = props;
  const { id: postId, body, title } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
  const [errorComment, setErrorComment] = useState<boolean>(false);
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const addComment = useCallback(
    async (data: CommentData) => {
      return postComment({ ...data, postId }).then(comment =>
        setComments(prev => [...prev, comment]),
      );
    },
    [postId],
  );

  const onDeleteComment = (id: number) => {
    removeComment(id);
    setComments(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    setComments([]);
    setIsAddFormActive(false);
  }, [postId]);

  useEffect(() => {
    setErrorComment(false);
    setIsCommentsLoading(true);
    getCommentsByPostId(postId)
      .then(setComments)
      .catch(() => setErrorComment(true))
      .finally(() => setIsCommentsLoading(false));
  }, [postId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${postId}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {errorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length > 0 && !isCommentsLoading && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  key={comment.id}
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
                      onClick={() => onDeleteComment(comment.id)}
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

          {comments.length === 0 && !isCommentsLoading && !errorComment && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentsLoading && !isAddFormActive && !errorComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddFormActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isAddFormActive && <NewCommentForm addComment={addComment} />}
      </div>
    </div>
  );
});
