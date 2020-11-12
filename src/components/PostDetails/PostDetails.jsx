import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPostComments } from '../../api/coments';
import { getPostDetail } from '../../api/posts';
import { CommentList } from '../CommentList/CommentList';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCommentsVisible, setIsCommentVisible] = useState(false);

  useEffect(() => {
    loadPostDetails();
    loadComments();
  }, [selectedPostId]);

  const loadPostDetails = async() => {
    setLoading(true);
    const postFromServer = await getPostDetail(selectedPostId);

    setPost(postFromServer);
    setLoading(false);
  };

  const loadComments = async() => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  const showComments = () => {
    setIsCommentVisible(true);
  };

  const hideComments = () => {
    setIsCommentVisible(false);
  };

  return (
    <div className="PostDetails">
      {
        // eslint-disable-next-line no-nested-ternary
        loading
          ? (
            <Loader />
          )
          : (post
            ? (
              <>
                <h2>Post details:</h2>

                <section className="PostDetails__post">
                  <p>{post.title}</p>
                </section>

                <section className="PostDetails__comments">
                  {
                    isCommentsVisible
                      ? (
                        <>
                          <button
                            type="button"
                            className="button"
                            onClick={hideComments}
                          >
                            {`Hide ${comments.length} comments`}
                          </button>

                          <CommentList
                            comments={comments}
                            updateComments={loadComments}
                          />
                        </>
                      )
                      : (
                        <button
                          type="button"
                          className="button"
                          onClick={showComments}
                        >
                          {`Show ${comments.length} comments`}
                        </button>
                      )
                  }

                </section>

                <section>
                  <div className="PostDetails__form-wrapper">
                    <NewCommentForm
                      postId={selectedPostId}
                      updateComments={loadComments}
                    />
                  </div>
                </section>
              </>
            )
            : (
              <h2>Post is unvaliable</h2>
            )
          )
      }

    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
