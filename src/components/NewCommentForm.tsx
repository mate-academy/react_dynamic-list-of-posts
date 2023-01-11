import React, { useState } from 'react';
import classNames from 'classnames';
import StorageService from 'services/StorageService';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import CommentsAsync from 'store/comments/commentsAsync';
import { UiActions } from 'store/ui/uiSlice';
import { selectSelectedPost } from 'store/posts/postsSelectors';
import { isEmailValid, isFieldRequired, isLength } from 'utilities/Validation';
import Input from 'components/Controls/Input';
import Textarea from './Controls/Textarea';

interface Form {
  name: string,
  email: string,
  body: string,
}

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedPost = useAppSelector(selectSelectedPost);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit, control, reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: StorageService.getUser().name || '',
      email: StorageService.getUser().email || '',
      body: '',
    },
  });

  const handleReset = () => {
    reset({
      name: StorageService.getUser().name || '',
      email: StorageService.getUser().email || '',
      body: '',
    });
  };

  const onSubmit = handleSubmit((data: Form) => {
    if (!selectedPost) {
      return;
    }

    const { name, email } = data;

    setLoading(true);
    const nexData = { ...data, postId: selectedPost?.id };

    dispatch(CommentsAsync.createComment(nexData))
      .unwrap()
      .then(() => {
        dispatch(UiActions.enqueueSnackbar({
          message: 'Comment has been added',
        }));
        StorageService.setUser({ name, email });
      })
      .then(() => handleReset())
      .finally(() => setLoading(false));
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-cy="NewCommentForm"
    >
      <Controller
        control={control}
        name="name"
        rules={{ required: isFieldRequired }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Author Name"
            placeholder="Name Surname"
            value={value}
            onChange={onChange}
            required
            error={!!errors.name}
            errorText={errors.name?.message || ''}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: isFieldRequired, pattern: isEmailValid }}
        render={({ field: { onChange, value } }) => (
          <Input
            label="Author Email"
            placeholder="email@test.com"
            value={value}
            onChange={onChange}
            required
            error={!!errors.email}
            errorText={errors.email?.message || ''}
          />
        )}
      />
      <Controller
        control={control}
        name="body"
        rules={{
          required: isFieldRequired,
          validate: {
            minLength: (value) => isLength(value, 12),
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            label="Comment Text"
            placeholder="Type comment here"
            value={value}
            onChange={onChange}
            required
            error={!!errors.body}
            errorText={errors.body?.message || ''}
          />
        )}
      />

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
          <button
            type="button"
            onClick={handleReset}
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
