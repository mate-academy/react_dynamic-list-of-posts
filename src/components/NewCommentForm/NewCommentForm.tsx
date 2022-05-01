import React, { useMemo, useState, useEffect } from 'react';
import classNames from 'classnames';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  createComment: (body: string, email:string, name: string) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  createComment,
}) => {
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [isValidForm, setIsValidForm] = useState(true);

  // eslint-disable-next-line no-useless-escape
  const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const changeInput = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setIsValidForm(true);

    switch (name) {
      case 'body':
        setBody(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'name':
        setName(value);
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setBody('');
    setEmail('');
    setName('');
    setIsValidForm(true);
  };

  const validation = useMemo(() => {
    return (userName.length > 0
      && body.length > 0
      && validator.test(email)
    );
  }, [email, body, userName]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation) {
      createComment(body, email, userName);
      resetForm();
    } else {
      setIsValidForm(false);
    }
  };

  useEffect(() => {
    resetForm();
  }, [postId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      {!isValidForm && (
        <p className="NewCommentForm__error">Enter correct information</p>
      )}

      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          className={classNames(
            'NewCommentForm__input',
            {
              'NewCommentForm__input--error':
                (!isValidForm && userName.length === 0),
            },
          )}
          onChange={changeInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          className={classNames(
            'NewCommentForm__input',
            {
              'NewCommentForm__input--error':
                (!isValidForm && !validator.test(email)),
            },
          )}
          onChange={changeInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          className={classNames(
            'NewCommentForm__input',
            {
              'NewCommentForm__input--error':
                (!isValidForm && body.length === 0),
            },
          )}
          onChange={changeInput}
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
