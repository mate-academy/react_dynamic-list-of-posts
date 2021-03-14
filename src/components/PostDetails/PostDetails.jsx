import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import {
  addNewComment,
  getPostComments,
  removePostComments,
} from '../../api/comments';
import { getPostDetails } from '../../api/postDetails';
import { Loader } from '../Loader';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [postDetail, setPostDetail] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  const loadPostDetails = useCallback(async() => {
    setLoadingPost(true);
    const loadedPostDetails = await getPostDetails(postId);

    setPostDetail(loadedPostDetails);
    setLoadingPost(false);
  }, [postId]);

  const loadPostComments = useCallback(async() => {
    setLoadingComment(true);
    const loadedPostComments = await getPostComments(postId);

    setPostComments(loadedPostComments);
    setLoadingComment(false);
  }, [postId]);

  useEffect(() => {
    loadPostDetails();
    loadPostComments();
  }, [loadPostDetails, loadPostComments]);

  const hideComments = () => {
    setShowComments(prev => (!prev));
  };

  const removeComment = async(commentId) => {
    await removePostComments(commentId);
    loadPostComments();
  };

  const addComment = async(name, email, body) => {
    setLoadingComment(true);
    await addNewComment(postId, name, email, body);
    const loadedPostComments = await getPostComments(postId);

    setLoadingComment(false);
    setPostComments(loadedPostComments);
  };

  return (
    !!postId && postDetail && (
      <div className="PostDetails">
        {loadingPost
          ? <Loader />
          : (
            <>
              <h2>Post details:</h2>
              <section className="PostDetails__post">
                <p>{postDetail.title}</p>
              </section>

              <section className="PostDetails__comments">
                {!!postComments.length && (
                <button type="button" className="button" onClick={hideComments}>
                  {showComments
                    ? `Hide ${postComments.length} comments`
                    : `Show ${postComments.length} comments`
                  }
                </button>
                )}
                {loadingComment
                  ? <Loader />
                  : (
                    showComments && (
                      <div>
                        <ul className="PostDetails__list">
                          {postComments.map(comment => (
                            <li
                              key={comment.id}
                              className="PostDetails__list-item"
                            >
                              <button
                                type="button"
                                className="PostDetails__remove-button button"
                                onClick={() => {
                                  removeComment(comment.id);
                                }}
                              >
                                X
                              </button>
                              <p>{comment.body}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

              </section>

              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm addComment={addComment} />
                </div>
              </section>
            </>
          )}

      </div>
    )
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
