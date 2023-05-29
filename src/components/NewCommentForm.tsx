import { useState } from 'react';
import classNames from 'classnames';
import { Input } from './Input';
import { CommentData } from '../types/Comment';

type FormData = {
  name: string;
  email: string;
  body: string;
};

type FormErrors = {
  name: boolean;
  email: boolean;
  body: boolean;
};

type NewCommentFormProps = {
  postId?: number;
  handleAddComment: <K>(data: K, url: string, msg: string) => Promise<void>;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  body: '',
};

const initialFormErrors: FormErrors = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm = ({
  postId,
  handleAddComment,
}: NewCommentFormProps) => {
  const [formData, setformData] = useState<FormData>(initialFormData);
  const [formErrors, setformErrors] = useState<FormErrors>(initialFormErrors);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (formErrors[e.target.name as keyof FormErrors]) {
      setformErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: false,
      }));
    }

    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClearButton = () => {
    setformErrors(initialFormErrors);
    setformData(initialFormData);
  };

  const handleSubmitForm: React.FormEventHandler = async (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        setformErrors((prevErrors) => ({ ...prevErrors, [key]: true }));
        isValid = false;
      }
    });

    if (isValid && postId) {
      setLoading(true);

      const data: CommentData = {
        ...formData,
        postId,
      };

      await handleAddComment(
        data,
        '/comments',
        'Unable to add comment',
      );

      setLoading(false);
      setformData((prevData) => ({ ...prevData, body: '' }));
    }
  };

  const { name, email, body } = formData;
  const { name: nameError, email: emailError, body: bodyError } = formErrors;

  const inputs = [
    {
      label: 'Author name',
      name: 'name',
      id: 'comment-author-name',
      value: name,
      placeholder: 'Name Surname',
      icon: 'fa-user',
      errorMsg: 'Name is required',
      isError: nameError,
    },
    {
      label: 'Author email',
      name: 'email',
      id: 'comment-author-email',
      value: email,
      placeholder: 'email@test.com',
      icon: 'fa-envelope',
      errorMsg: 'Email is required',
      isError: emailError,
    },
  ];

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
      {inputs.map((input) => (
        <Input key={input.id} {...input} onChange={handleInputChange} />
      ))}

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={body}
            onChange={handleInputChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': bodyError })}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': loading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
