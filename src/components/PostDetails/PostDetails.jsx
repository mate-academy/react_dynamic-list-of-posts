import React from 'react';
import { PropTypes } from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

const PostDetails = ({ body }) => (
  <div className="PostDetails">
    <h2>Post details:</h2>

    <section className="PostDetails__post">
      <p>{body}</p>
    </section>

    <section className="PostDetails__comments">
      <button type="button" className="button">Hide 2 comments</button>

      <ul className="PostDetails__list">
        <li className="PostDetails__list-item">
          <button
            type="button"
            className="PostDetails__remove-button button"
          >
            X
          </button>
          <p>My first comment</p>
        </li>

        <li className="PostDetails__list-item">
          <button
            type="button"
            className="PostDetails__remove-button button"
          >
            X
          </button>
          <p>sad sds dfsadf asdf asdf</p>
        </li>
      </ul>
    </section>

    <section>
      <div className="PostDetails__form-wrapper">
        <NewCommentForm />
      </div>
    </section>
  </div>
);

PostDetails.propTypes = {
  body: PropTypes.string.isRequired,
};

export { PostDetails };
