import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';
import './NewCommentForm.scss';
import cn from 'classnames';
import { addPostComment } from '../../api/comments';
import { PostsContext } from '../../PostsContext';

export const NewCommentForm: FC = memo(() => {
  const { selectedPostId } = useContext(PostsContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasCommentError, setHasCommentError] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setUserName(value);
        setHasNameError(false);
        break;
      case 'email':
        setUserEmail(value);
        setHasEmailError(false);
        break;
      case 'body':
        setUserComment(value);
        setHasCommentError(false);
        break;
      default:
        break;
    }
  }, []);

  const resetForm = useCallback(() => {
    setUserName('');
    setHasNameError(false);
    setUserEmail('');
    setHasEmailError(false);
    setUserComment('');
    setHasCommentError(false);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userName && userEmail && userComment) {
      addPostComment({
        postId: selectedPostId,
        name: userName,
        email: userEmail,
        body: userComment,
      });

      resetForm();
    }

    if (!userName) {
      setHasNameError(true);
    }

    if (!userEmail) {
      setHasEmailError(true);
    }

    if (!userComment) {
      setHasCommentError(true);
    }
  }, [userName, userEmail, userComment, selectedPostId, addPostComment]);

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
          className={cn(
            'NewCommentForm__input',
            { 'input--error': hasNameError },
          )}
          value={userName}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className={cn(
            'NewCommentForm__input',
            { 'input--error': hasEmailError },
          )}
          value={userEmail}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className={cn(
            'NewCommentForm__input',
            { 'input--error': hasCommentError },
          )}
          value={userComment}
          onChange={handleChange}
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
});
