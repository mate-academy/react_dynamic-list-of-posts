import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as service from '../services/servises';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null;
  setLoading: (value: boolean) => void;
  setErrorMsg: (message: string) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  setLoading,
  setErrorMsg,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [, setCommentTemp] = useState<Comment | null>(null);

  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setLoading(true);
    setLocalLoading(true);
    setError(false);

    service
      .getPostsComments(post.id)
      .then(setComments)
      .catch(() => {
        setError(true);
        setErrorMsg('Failed to load comments');
      })
      .finally(() => {
        setLoading(false);
        setLocalLoading(false);
      });
  }, [post]);

  const deleteComments = (comment: Comment) => {
    setLocalLoading(true);
    service
      .deletePostsComment(comment)
      .then(() => {
        setComments(prev => prev.filter(c => c.id !== comment.id));
      })
      .catch(() => {
        setError(true);
        setErrorMsg('Failed to delete comment');
      })
      .finally(() => setLocalLoading(false));
  };

  const addComment = ({
    postId,
    name: newName,
    email: newEmail,
    body: newComment,
  }: Comment) => {
    const newTempComment: Comment = {
      id: 0,
      postId,
      name: newName,
      email: newEmail,
      body: newComment,
    };

    setLocalLoading(true);
    setCommentTemp(newTempComment);

    return service
      .createPostsComment(newTempComment)
      .then(addedComment => {
        setComments(currentComments => [...currentComments, addedComment]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setCommentTemp(null);
        setLocalLoading(false);
      });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {localLoading && <Loader />}

          {!localLoading && error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!localLoading && !error && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!localLoading && !error && comments.length > 0 && (
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
                      onClick={() => deleteComments(comment)}
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
          {!isOpen && !localLoading && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isOpen && post && (
          <NewCommentForm postId={post.id} onCommentAdd={addComment} />
        )}
      </div>
    </div>
  );
};
