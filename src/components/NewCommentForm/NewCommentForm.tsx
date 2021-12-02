import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './NewCommentForm.scss';

type FormValues = {
  name: string,
  email: string,
  body: string,
};

type Props = {
  addNewComment: (comment: FormValues) => void;
  selectedPostId: number;
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment, selectedPostId }) => {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const onSubmit = (data: FormValues) => {
    addNewComment(data);
    reset();
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      reset();
    }
  }, [selectedPostId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="form-field">
        <input
          {...register('name', { required: true })}
          placeholder="Your name"
          className="NewCommentForm__input"
          autoComplete="off"
        />
        {errors.name && <p className="form-field__error">This is required</p>}
      </div>

      <div className="form-field">
        <input
          {...register('email', { required: true })}
          placeholder="Your email"
          className="NewCommentForm__input"
          autoComplete="off"
        />
        {errors.email && <p className="form-field__error">This is required</p>}
      </div>

      <div className="form-field">
        <textarea
          {...register('body', { required: true })}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
        {errors.body && <p className="form-field__error">This is requiredvv</p>}
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={Boolean(Object.keys(errors).length)}
      >
        Add a comment
      </button>
    </form>
  );
};
