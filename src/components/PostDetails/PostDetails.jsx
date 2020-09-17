import React from 'react';
import PropTypes, { object } from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { CommentsList } from './CommenstList';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostDetails, postComments }) => (
  <div className="PostDetails">
    <h2>Post details:</h2>

    <section className="PostDetails__post">
      <p>{selectedPostDetails.body}</p>
    </section>

    <section className="PostDetails__comments">
      <button type="button" className="button">Hide 2 comments</button>
      <CommentsList postComments={postComments} />
    </section>

    <section>
      <div className="PostDetails__form-wrapper">
        <NewCommentForm />
      </div>
    </section>
  </div>
);

PostDetails.propTypes = {
  selectedPostDetails: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  postComments: PropTypes.arrayOf(object).isRequired,
};
