import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteCommentById, getCommentsByPostId } from '../api/commets';
import { Comment } from '../types/Comment';
import { CommentList } from './CommentList';

type Props = {
  selected: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selected }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [errors, setErrors] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (selected) {
      setIsLoad(true);
      setIsForm(false);
      getCommentsByPostId(selected.id)
        .then(response => {
          if (!Array.isArray(response)) {
            throw new Error('not found');
          }

          setErrors(false);
          setComments(response);
        })
        .catch(() => {
          setErrors(true);
        })
        .finally(() => {
          setIsLoad(false);
        });
    }
  }, [selected]);

  const handleDelete = (commentId: number) => {
    setComments(prev => [...prev].filter(comment => comment.id !== commentId));
    deleteCommentById(commentId).then();
  };

  const handleClickNewComment = () => {
    setIsForm(true);
  };

  const handleAddComment = (newComment: Comment): void => {
    setComments(prev => [...prev, newComment]);
  };

  if (!selected) {
    return;
  }

  const { id, body, title } = selected;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoad && <Loader />}

          {errors && !isLoad && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!errors && !isLoad && (
            <CommentList comments={comments} onDelete={handleDelete} />
          )}

          {!isForm && !isLoad && !errors && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleClickNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && !isLoad && !errors && (
          <NewCommentForm
            onAdd={handleAddComment}
            onError={setErrors}
            selected={selected}
          />
        )}
      </div>
    </div>
  );
};
