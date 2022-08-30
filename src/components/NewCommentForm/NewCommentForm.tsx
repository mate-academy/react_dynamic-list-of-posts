import React, { useEffect, useState } from 'react';
import { getUniqueCommentId, sendComment } from '../../api/comments';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Comment } from '../../store/slices/commentSlice/commentsSlice';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const [uniqueCommentId, setUniqueCommentId] = useState<number>(0);
  const { selectedPost } = useAppSelector(state => state.postSlice);

  useEffect(() => {
    (async function() {
      const id = await getUniqueCommentId();

      console.log(id);

      setUniqueCommentId(id);
    })()
  }, [uniqueCommentId]);

  const emptyComment: Comment = {
    id: uniqueCommentId,
    postId: selectedPost?.id as number,
    name: '',
    email: '',
    body: '',
    createdAt: 'now',
    updatedAt: 'then'
  };

  const [comment, setComment] = useState<Comment>(emptyComment);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendComment(comment);
    setComment(emptyComment);
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={handleInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={handleInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment.body}
          onChange={handleInput}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
