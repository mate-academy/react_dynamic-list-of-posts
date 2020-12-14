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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (name && email && body) {
      await addComment({
        ...post, postId,
      });
      const res = await getPostComments(postId);

      setComments(res);
      setPost(postNew);
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
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className={classNames('NewCommentForm__submit-button button', {
          visible: name && email && body,
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
