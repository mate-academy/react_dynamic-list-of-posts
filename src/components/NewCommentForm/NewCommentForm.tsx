import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  handleAddComment: (x: NewComment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  handleAddComment,
}) => {
  const initialState = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const initialError = {
    name: '',
    email: '',
    body: '',
  };

  const [newComment, setNewComment] = useState(initialState);
  const [newCommentError, setNewCommentError] = useState(initialError);

  const handleInput = useCallback((
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;

    setNewComment(prev => ({ ...prev, [name]: value, postId: selectedPostId }));
  }, [selectedPostId, newComment]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setNewCommentError({ ...initialError });

    if (!newComment.name.trim()) {
      setNewCommentError(prev => ({ ...prev, name: 'Enter title!' }));
    }

    if (!newComment.body.trim()) {
      setNewCommentError(prev => ({ ...prev, body: 'Enter comment!' }));
    }

    if (!newComment.email.trim()) {
      setNewCommentError(prev => ({ ...prev, email: 'Enter email!' }));
    }

    const validComment = Object.values(newComment).every(item => item);
    const validErrors = Object.values(newCommentError).some(item => item);

    if (validComment && validErrors) {
      handleAddComment(newComment);
      setNewComment(initialState);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleInput}
          value={newComment.name}
        />
        {newCommentError.name && (
          <p className="error-message">{newCommentError.name}</p>
        )}
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleInput}
          value={newComment.email}
        />
        {newCommentError.email && (
          <p className="error-message">{newCommentError.email}</p>
        )}
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleInput}
          value={newComment.body}
        />
        {newCommentError.body && (
          <p className="error-message">{newCommentError.body}</p>
        )}

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
