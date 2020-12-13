import React, { useState } from 'react';
import './NewCommentForm.scss';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { addComment, getPostComments } from '../../api/comments';

const postNew = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm = ({ postId, setComments }) => {
  const [post, setPost] = useState(postNew);
  const { name, email, body } = post;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body) {
      addComment({
        ...post, postId,
      });
      getPostComments(postId);
      setPost(postNew);
      getPostComments(postId).then(setComments);
    }
  };

  const handleChange = (e) => {
    const { value, name: item } = e.target;

    setPost({
      ...post,
      [item]: value.trimStart(),
    });
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={e => handleChange(e)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={e => handleChange(e)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={e => handleChange(e)}
        />
      </div>

      <button
        type="submit"
        className={classNames('NewCommentForm__submit-button button', {
          visible: body,
        })}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};
