import React from 'react';
import './NewCommentForm.scss';

import { Formik, Form, Field } from 'formik';
import { addComments } from '../../api/api';

interface MyFormValues {
  name: string,
  email: string,
  body: string,
}

type Props = {
  postId: number,
  requestComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  requestComments,
}) => {
  const initialValues: MyFormValues = {
    name: '',
    email: '',
    body: '',
  };

  const addingComment = async (value: MyFormValues) => {
    // eslint-disable-next-line no-console
    console.log(value);

    const packComment = {
      postId,
      name: value.name,
      email: value.email,
      body: value.body,
    };

    await addComments(packComment);
    requestComments();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // eslint-disable-next-line no-console
          console.log({ values, actions });

          addingComment(values);
          actions.resetForm();
        }}

      >
        <Form className="NewCommentForm">
          <div className="form-field">
            <label htmlFor="name">
              <Field
                id="name"
                name="name"
                placeholder="Your name"
                className="NewCommentForm__input"
              />
            </label>
          </div>

          <div className="form-field">
            <label htmlFor="email">
              <Field
                id="email"
                name="email"
                placeholder="Your email"
                className="NewCommentForm__input"
              />
            </label>
          </div>

          <div className="form-field">
            <label htmlFor="body">
              <Field
                as="textarea"
                id="body"
                name="body"
                placeholder="Type comment here"
                className="NewCommentForm__input"
              />
            </label>
          </div>
          <button
            type="submit"
            className="NewCommentForm__submit-button button"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};
