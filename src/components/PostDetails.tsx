import React, { useEffect, useState } from 'react';

import {
  getComments,
  createComment,
  deleteComment,
} from '../../public/api/api';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);

  const [isAddingComment, setIsAddingComment] = useState(true);

  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isCommentsError, setIsCommentsError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadComments = async () => {
      setIsCommentsLoading(true);
      setComments([]);
      setIsCommentsError(null);

      try {
        const dataComments = await getComments(id);

        if (!ignore) {
          setComments(dataComments);
          setIsCommentsError(null);
          setIsCommentsLoading(false);
        }
      } catch {
        if (ignore) {
          return;
        }

        setIsCommentsError('Something went wrong');
        setIsCommentsLoading(false);
      }
    };

    loadComments();

    return () => {
      ignore = true;
    };
  }, [id]);
  
  useEffect(() => {
    setIsAddingComment(true)
  }, [id])

  const handleAddComment = async (commentData: CommentData) => {
    setIsCommentsError(null);
    try {
      const newComment = await createComment(commentData, selectedPost.id);

      setComments(prev => [...prev, newComment]);
    } catch {
      setIsCommentsError('Something went wrong');
    }
  };

  const handleDeleteComment = (idComment: number) => {
    setComments(prev => prev.filter(comment => comment.id !== idComment));
    deleteComment(idComment);
  };

  const commentsLength = comments.length === 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isCommentsError}
            </div>
          )}
          {!isCommentsLoading && !isCommentsError && (
            <>
              {commentsLength && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!commentsLength && <p className="title is-4">Comments:</p>}

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
                </article>
              ))}

              {isAddingComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsAddingComment(false)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {!isCommentsError && !isAddingComment && (
          <NewCommentForm onAddComment={handleAddComment} />
        )}
      </div>
    </div>
  );
};
