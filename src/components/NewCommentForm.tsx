import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../api';
import { GlobalContext } from '../reducer';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { Field } from './Field';

type Props = {
  getComments: (id:number) => void
};

export const NewCommentForm: React.FC<Props> = ({ getComments }) => {
  const [state, dispatch] = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [valideFrom, setValidForm] = useState(
    { name: true, email: true, text: true },
  );

  const clearForm = () => {
    setName('');
    setEmail('');
    setText('');
    setValidForm({ name: true, email: true, text: true });
  };

  const addCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = { ...valideFrom };

    if (!name) {
      valid.name = false;
    }

    if (!email) {
      valid.email = false;
    }

    if (!text) {
      valid.text = false;
    }

    if (!Object.values(valid).some((el: boolean) => el === false)) {
      if (state.selectedPost) {
        dispatch({
          type: 'loadData',
          objectLoad: { type: 'addComments', active: true },
        });
        addComment({
          id: 0,
          postId: state.selectedPost.id,
          name,
          email,
          body: text,
        }).then((request: Comment | Error) => {
          if ('message' in request) {
            dispatch({
              type: 'error',
              error: { ...request, type: 'comments' },
            });
            dispatch({
              type: 'loadData',
              objectLoad: { type: 'addComments', active: false },
            });
          }

          if (state.selectedPost) {
            getComments(state.selectedPost.id);
            clearForm();
            dispatch({
              type: 'loadData',
              objectLoad: { type: 'addComments', active: false },
            });
          }
        });
      }
    }

    setValidForm(valid);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addCommentSubmit}>
      <Field
        value={name}
        setValue={setName}
        error={valideFrom.name}
        textError="Name is required"
        title="Author Name"
        ValidationFields={valideFrom}
        setValidFormFields={setValidForm}
        type="name"
        placeholder="Name Surname"
      />
      <Field
        value={email}
        setValue={setEmail}
        error={valideFrom.email}
        textError="Email is required"
        title="Author Email"
        ValidationFields={valideFrom}
        setValidFormFields={setValidForm}
        type="email"
        placeholder="email@test.com"
      />
      <Field
        value={text}
        setValue={setText}
        error={valideFrom.text}
        textError="Enter some text"
        title="Comment Text"
        ValidationFields={valideFrom}
        setValidFormFields={setValidForm}
        type="text"
        placeholder="Type comment here"
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              classNames('button is-link', {
                'is-loading': state.load.type === 'addComments'
                && state.load.active,
              })
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
