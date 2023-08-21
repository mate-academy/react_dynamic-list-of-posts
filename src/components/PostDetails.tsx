import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentsLoadError, setCommentsLoadError] = useState('');
  const [commentsDelError, setCommentsDelError] = useState<number[]>([]);
  const [addNewComment, setAddNewComment] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (commentsLoadError) {
      setCommentsLoadError('');
    }

    if (comments) {
      setComments(null);
    }

    if (addNewComment) {
      setAddNewComment(false);
    }

    client.get<Comment[]>(`/comments?postId=${id}`)
      .then(setComments)
      .catch(() => setCommentsLoadError("Can't load comments for current post"))
      .finally(() => setLoading(false));
  }, [post]);

  const handleDeleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`)
      .then(() => {
        setComments(
          current => current?.filter(item => item.id !== commentId) || null,
        );
        setCommentsDelError([]);
      })
      .catch(() => setCommentsDelError(current => [...current, commentId]));
  };

  const handleAddNewComment = (newComment: Comment) => {
    setComments(current => (current ? [...current, newComment] : [newComment]));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        {loading && (
          <Loader />
        )}

        {!loading && (
          <div className="block">
            {commentsLoadError && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                {commentsLoadError}
              </div>
            )}

            {comments && (!comments.length ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
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
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>

                    {commentsDelError.includes(comment.id) && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Can&apos;t delete comment. Try again later.
                      </div>
                    )}
                  </article>
                ))}
              </>
            ))}

            {!addNewComment && !commentsLoadError && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setAddNewComment(true)}
              >
                Write a comment
              </button>
            )}
          </div>
        )}

        {addNewComment && (
          <NewCommentForm post={post} onAddNewComment={handleAddNewComment} />
        )}
      </div>
    </div>
  );
};
