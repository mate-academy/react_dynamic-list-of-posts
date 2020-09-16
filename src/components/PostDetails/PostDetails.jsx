import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as postApi from '../../api/post';
import { getPostComments, deletePostComment } from '../../api/comments';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ id }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [comments, setComments] = useState(null);
  const [hiddenComments, setHiddenComments] = useState(true);

  useEffect(() => {
    postApi.postDetails(id)
      .then((result) => {
        setPostDetails(result.data);
      });

    getPostComments(id)
      .then((result) => {
        setComments(result);
      });
  }, [id]);

  if (!postDetails) {
    return <Loader />;
  }

  return (
    postDetails && (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{postDetails.title}</p>
        </section>
        <section className="PostDetails__body">
          <p>{postDetails.body}</p>
        </section>

        {comments
        && (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setHiddenComments(!hiddenComments)}
            >
              {`${hiddenComments
                ? 'Hide' : 'Show'} ${comments.length} comments`}
            </button>

            {hiddenComments
            && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={async() => {
                        deletePostComment(comment.id);
                        setComments(await getPostComments(postDetails.id));
                      }}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )
            }
          </section>
        )}

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm id={id} setComments={setComments} />
          </div>
        </section>
      </div>
    )
  );
};

PostDetails.propTypes = {
  id: PropTypes.number.isRequired,
};
