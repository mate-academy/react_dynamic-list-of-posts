import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
// Styles
import './NewCommentForm.scss';
// Api requests
import { createComment } from '../../api/comments';
import { LoadComments } from '../../types/LoadComments';

type Props = {
  postId: number;
  loadComments: LoadComments;
};

export const NewCommentForm: React.FC<Props> = ({ postId, loadComments }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [body, setBody] = useState<string>('');
  const [canAdd, setCanAdd] = useState<boolean>(false);

  const changeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const value = e.target.value.trimLeft();
    const validation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (e.target.name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        setValidEmail(true);
        setValidEmail(validation.test(value));
        break;

      case 'body':
        setBody(value);
        break;

      default:
        break;
    }
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    createComment(postId, name, email, body)
      .then(comment => loadComments(comment.postId));
    setName('');
    setEmail('');
    setBody('');
  };

  useEffect(() => {
    setCanAdd(!!name && !!email && validEmail && !!body);
  }, [name, email, body]);

  return (
    <form className="NewCommentForm" onSubmit={submitHandler}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={changeHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={changeHandler}
        />

        {!validEmail && (
          <p className="NewCommentForm__error">Please enter correct Email</p>
        )}
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={changeHandler}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={!canAdd}
      >
        Add a comment
      </button>
    </form>
  );
};
