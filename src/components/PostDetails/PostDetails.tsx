import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [errorInComments, setErrorInComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsCommentsLoading(true);
    setErrorInComments(false);
    try {
      const result = await client.get<Comment[]>(`/comments?postId=${post.id}`);

      setComments(result);
    } catch (error) {
      setErrorInComments(true);
    }

    setIsCommentsLoading(false);
  }, []);

  useEffect(() => {
    setIsCommenting(false);
    setComments([]);
    fetchComments();
  }, [post]);

  const handleWriteComment = () => {
    setIsCommenting(true);
  };

  const handleDeleteComment = useCallback((commentId: number) => {
    setComments((prevComments) => (
      prevComments.filter(comment => comment.id !== commentId)
    ));
    client.delete(`/comments/${commentId}`);
  }, []);

  const handleAddComment = useCallback((comment: Comment) => {
    setComments((prevComments) => ([
      ...prevComments,
      comment,
    ]));
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && (
            <Loader />
          )}

          {errorInComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading && !errorInComments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length !== 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {comments.map((comment) => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a
                  href={`mailto:${comment.email}`}
                  data-cy="CommentAuthor"
                >
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isCommentsLoading && !isCommenting && (
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

        {isCommenting && (
          <NewCommentForm
            postId={post.id}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
