import React, { useState } from 'react';
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

  // I tried to unit these states in 'Inputs' but I didn't succeed
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const addingComment = async (value: MyFormValues) => {
    setName(value.name);
    setEmail(value.email);
    setBody(value.body);

    const packComment = {
      postId,
      name,
      email,
      body,
    };

    await addComments(packComment);
    requestComments();
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          // eslint-disable-next-line no-console
          console.log({ values, actions });

          addingComment(values);
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
