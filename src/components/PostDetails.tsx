import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostContext } from '../store/PostProvider';
import { CommentsContext } from '../store/CommentsProvider';
import { deleteCommentFromServer } from '../api';

export const PostDetails: React.FC = () => {
  const { post } = useContext(PostContext);
  const { comments, commentsStatus, setComments, setCommentsStatus } =
    useContext(CommentsContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
  }, [post]);

  const deleteComment = async (id: number) => {
    setComments(prev => prev.filter(comment => comment.id !== id));

    try {
      const response = await deleteCommentFromServer(id);

      if (!response) {
        throw new Error('404');
      }
    } catch {
      setCommentsStatus('error');
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsStatus === 'loading' && <Loader />}

        {commentsStatus === 'error' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsStatus === 'success' && (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => {
                  return (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
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
                          onClick={() => deleteComment(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  );
                })}
              </>
            )}
            {!isEditing && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsEditing(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isEditing && <NewCommentForm />}
    </div>
  );
};
