import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Comments } from '../Comments';
import './PostDetails.scss';
import { PostDetailsTypes } from './PostDetailsTypes';

import { getPostDetails, getPostComments } from '../../api/posts';
import { Loader } from '../Loader';

export const PostDetails = React.memo(({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [comments, setComments] = useState([]);
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    setLoadingDetails(false);
    getPostDetails(postId)
      .then((result) => {
        setPostDetails(result);
        setLoadingDetails(true);
      });
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then((result) => {
        setComments(result);
      });
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {loadingDetails
        ? (
          <>
            <section className="PostDetails__post">
              <p>{postDetails.title}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length > 0 && (
                !hideComments ? (
                  <button
                    type="button"
                    className="button"
                    onClick={() => setHideComments(true)}
                  >
                    Hide comments
                  </button>
                )
                  : (
                    <button
                      type="button"
                      className="button"
                      onClick={() => setHideComments(false)}
                    >
                      Show comments
                    </button>
                  )
              )}
              {!hideComments && (
                <Comments
                  comments={comments}
                  setComments={setComments}
                />
              )}
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  setComments={setComments}
                  postId={postId}
                />
              </div>
            </section>
          </>
        )
        : (
          <Loader />
        )
      }
    </div>
  );
});

PostDetails.propTypes = PostDetailsTypes;
