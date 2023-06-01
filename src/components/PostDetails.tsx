import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  const { id, title, body } = useMemo(() => post, [post]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);

        const commentsData = await client.get<Comment[]>(
          `/comments?postId=${id}`,
        );

        setComments(commentsData);
      } catch {
        setError(true);

        if (comments.length) {
          setComments([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();

    setShowNewCommentForm(false);
  }, [post]);

  const handleDeleteCommentButton = useCallback((commentId: number) => {
    client.delete(`/comments/${commentId}`);

    setComments((prevState) => (
      prevState.filter((comment) => comment.id !== commentId)
    ));
  }, []);

  const handleWriteCommentButtonClick = useCallback(() => {
    setShowNewCommentForm(true);
  }, []);

  const postCommentError = useCallback(() => {
    setError(true);
  }, []);

  const showNewComment = useCallback(
    (newComment: Comment) => {
      setComments((prevState) => [...prevState, newComment]);
    },
    [comments],
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="block">
              {error && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map((comment) => {
                    const {
                      id: commentId, name, body: commentBody, email,
                    } = comment;

                    return (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={commentId}
                      >
                        <div className="message-header">
                          <a href={`mailto:${email}`} data-cy="CommentAuthor">
                            {name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteCommentButton(commentId)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {commentBody}
                        </div>
                      </article>
                    );
                  })}
                </>
              )}

              {!showNewCommentForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleWriteCommentButtonClick}
                >
                  Write a comment
                </button>
              )}
            </div>

            {showNewCommentForm && (
              <NewCommentForm
                postId={id}
                postCommentError={postCommentError}
                showNewComment={showNewComment}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
