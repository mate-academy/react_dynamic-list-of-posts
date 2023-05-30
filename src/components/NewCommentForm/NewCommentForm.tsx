import { useCallback, useContext, useState } from 'react';
import { InputField, TextareaField } from './components';
import { Button } from '../index';
import {
  Error,
  Loading,
  FormSubmit,
  CommentData,
} from '../../types';
import { addCommentOnServer } from '../../api';
import { PostDetailsContext } from '../../context';

export const NewCommentForm: React.FC = () => {
  const [fieldNames, setFieldNames] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', body: '' });
  const {
    post,
    loading,
    setError,
    setLoading,
    setComments,
  } = useContext(PostDetailsContext);

  const validateForm = useCallback((form: CommentData) => {
    Object.entries(form).forEach((item) => {
      if (!item[1]) {
        setFieldNames((oldNames) => [...oldNames, item[0]]);
      }
    });

    const values = Object.values(form);

    return values.some(value => !value.length);
  }, [fieldNames]);

  const handleSubmit = useCallback(async (e: FormSubmit) => {
    e.preventDefault();

    const isValid = validateForm(formData);

    if (isValid) {
      return;
    }

    setLoading(Loading.AddComment);

    try {
      const newComment = await addCommentOnServer(
        { ...formData, postId: post?.id || 0 },
      );

      setComments(oldComments => [...oldComments, newComment]);
    } catch {
      setError(Error.AddComment);
    } finally {
      setLoading(Loading.None);
    }

    setFormData(oldData => Object({ ...oldData, body: '' }));
  }, [fieldNames, formData]);

  const handleOnChange = (name: string, value: string) => {
    setFormData(oldData => Object({ ...oldData, [name]: value }));

    const isError = fieldNames.includes(name);

    if (!isError) {
      return;
    }

    setFieldNames(oldNames => oldNames.filter(item => item !== name));
  };

  const clearForm = useCallback(() => {
    setFormData({ name: '', email: '', body: '' });
    setFieldNames([]);
  }, [formData]);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <InputField
        id="comment-author-name"
        name="Name"
        icon="user"
        value={formData.name}
        placeholder="Name Surname"
        hasError={fieldNames.includes('name')}
        onChange={handleOnChange}
      />

      <InputField
        id="comment-author-email"
        name="Email"
        icon="envelope"
        value={formData.email}
        placeholder="email@test.com"
        hasError={fieldNames.includes('email')}
        onChange={handleOnChange}
      />

      <TextareaField
        id="comment-body"
        name="Body"
        value={formData.body}
        labelText="Enter some text"
        placeholder="Type comment here"
        hasError={fieldNames.includes('body')}
        onChange={handleOnChange}
      />

      <div className="field is-grouped">
        <div className="control">

          <Button
            type="submit"
            loading={loading === Loading.AddComment}
          >
            Add
          </Button>
        </div>

        <div className="control">
          <Button
            type="reset"
            className="is-light"
            onClick={clearForm}
          >
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
};
