import { ChangeEvent, FormEvent, useState } from 'react';
import { CommentData } from '../types/Comment';
import { Field } from './Field';
import classNames from 'classnames';

const defaultValues: CommentData = {
  body: '',
  email: '',
  name: '',
};

type FormValues = typeof defaultValues;

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate({ body, email, name }: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (name.length === 0) {
    errors.name = 'Name is required';
  }

  if (email.length === 0) {
    errors.email = 'Email is required';
  }

  if (body.length === 0) {
    errors.body = 'Enter some text';
  }

  return errors;
}

interface Props {
  addComment: (comment: CommentData) => Promise<void>;
}

export const NewCommentForm = ({ addComment }: Props) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [count, setCount] = useState(0);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      setIsLoading(false);

      return;
    }

    const newComment: CommentData = {
      ...values,
    };

    addComment({ ...newComment })
      .then(() => {
        setValues({ name: values.name, email: values.email, body: '' });
        setCount(prev => prev + 1);
      })
      .finally(() => setIsLoading(false));
  };

  const onReset = () => {
    setValues(defaultValues);
    setErrors({});
  };

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof FormValues];

      return copy;
    });
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
      key={count}
      onReset={onReset}
    >
      <Field
        id={'comment-author-name'}
        label="Author Name"
        type="text"
        name="name"
        placeholder="Name Surname"
        value={values.name}
        onChange={handleChange}
        lIcon="fa-user"
        error={errors.name}
        dataCy="NameField"
      />
      <Field
        id={'comment-author-email'}
        label="Author Email"
        type="email"
        name="email"
        placeholder="email@test.com"
        value={values.email}
        onChange={handleChange}
        lIcon="fa-envelope"
        error={errors.email}
        dataCy="EmailField"
      />

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={values.body}
            onChange={handleChange}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
