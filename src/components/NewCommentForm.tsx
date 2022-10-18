import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/comments';

interface Props {
  postId: number;
}

Yup.addMethod(Yup.string, 'whitespace', function f(message: string) {
  // eslint-disable-next-line react/no-this-in-sfc
  return this.test('whitespace', message, (str: string | undefined) => {
    return str?.trim().length !== 0;
  });
});

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const queryClient = useQueryClient();
  const addPostMutation = useMutation(['addPost', postId], addComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments', postId]),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        body: '',
      }}
      validationSchema={Yup.object({
        name: Yup
          .string()
          .required('Name is required'),
        email: Yup
          .string()
          .email('Write valid email')
          .required('Email is required'),
        body: Yup
          .string()
          .required('Enter some text')
          .whitespace('empty comment is not allowed'),
      })}
      onSubmit={(values, { setFieldValue }) => {
        addPostMutation.mutate({
          name: values.name,
          email: values.email,
          body: values.body,
          postId,
        });
        setFieldValue('body', '', false);
      }}
    >
      { ({ errors, touched }) => (
        <Form data-cy="NewCommentForm">
          <div className="field" data-cy="NameField">
            <label className="label" htmlFor="comment-author-name">
              Author Name
            </label>

            <div className="control has-icons-left has-icons-right">
              <Field
                type="text"
                name="name"
                id="comment-author-name"
                placeholder="Name Surname"
                className={classNames(
                  'input',
                  { 'is-danger': errors.name && touched.name },
                )}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>

              {errors.name && touched.name && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>

            <ErrorMessage
              name="name"
              component="p"
              className="help is-danger"
              data-cy="ErrorMessage"
            />
          </div>

          <div className="field" data-cy="EmailField">
            <label className="label" htmlFor="comment-author-email">
              Author Email
            </label>

            <div className="control has-icons-left has-icons-right">
              <Field
                type="text"
                name="email"
                id="comment-author-email"
                placeholder="email@test.com"
                className={classNames(
                  'input',
                  { 'is-danger': errors.email && touched.email },
                )}
              />

              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>

              {errors.email && touched.email && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>

            <ErrorMessage
              name="email"
              component="p"
              className="help is-danger"
              data-cy="ErrorMessage"
            />
          </div>

          <div className="field" data-cy="BodyField">
            <label className="label" htmlFor="comment-body">
              Comment Text
            </label>

            <div className="control">
              <Field
                as="textarea"
                id="comment-body"
                name="body"
                placeholder="Type comment here"
                className={classNames(
                  'input',
                  { 'is-danger': errors.body && touched.body },
                )}
              />
            </div>
            <ErrorMessage
              name="body"
              component="p"
              className="help is-danger"
              data-cy="ErrorMessage"
            />
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className={classNames(
                  'button',
                  'is-link',
                  { 'is-loading': addPostMutation.isLoading },
                )}
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
        </Form>
      )}
    </Formik>

  );
};
