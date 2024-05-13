/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';

import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const PostDetails: React.FC<{
  post: Post | null;
}> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  type ComStatusType = 'loading' | 'noComments' | 'error' | 'idle';
  const [commentFetchStatus, setCommentFetchStatus] =
    useState<ComStatusType>('idle');
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    setIsCommenting(false);
    setCommentFetchStatus('loading');
    client
      .get<Comment[]>('/comments?postId=' + post?.id)
      .then(data => {
        setComments(data);

        if (data.length === 0) {
          setCommentFetchStatus('noComments');
        } else {
          setCommentFetchStatus('idle');
        }
      })
      .catch(() => {
        setCommentFetchStatus('error');
      });
  }, [post]);

  function addComment(newComment: Partial<Comment>) {
    return client
      .post<Comment>('/comments', { ...newComment, postId: post?.id })
      .then(res => {
        setComments((prevComments: Comment[]) => [...prevComments, res]);
        setCommentFetchStatus(prevStatus =>
          prevStatus === 'noComments' ? 'idle' : prevStatus,
        );

        return true;
      })
      .catch(() => {
        return false;
      });
  }

  function deleteComment(commentId: number) {
    setComments((prevComments: Comment[]) => {
      const newTodos = prevComments.filter(comment => comment.id !== commentId);

      if (newTodos.length === 0) {
        setCommentFetchStatus('noComments');
      }

      return newTodos;
    });

    return client
      .delete('/comments/' + commentId)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  const commentDisplay = useMemo(() => {
    switch (commentFetchStatus) {
      case 'error':
        return (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        );
      case 'noComments':
        return (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        );
      case 'loading':
        return <Loader />;

      default:
        return (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(({ id, email, name, body }) => (
              <article key={id} className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href={'mailto:' + email} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => {
                      deleteComment(id);
                    }}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            ))}
          </>
        );
    }
  }, [commentFetchStatus, comments]);

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
          {commentDisplay}

          {!isCommenting &&
            commentFetchStatus !== 'error' &&
            commentFetchStatus !== 'loading' && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsCommenting(true);
              }}
            >
                Write a comment
            </button>
          )}
        </div>

        {isCommenting && <NewCommentForm addComment={addComment} />}
      </div>
    </div>
  );
};
