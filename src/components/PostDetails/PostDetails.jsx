import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostComments, deleteCommentFromServer } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader/Loader';
import { Comment } from '../Comment';

export function PostDetails({ selectedPostId }) {
  const [openPost, setOpenPost] = useState({});
  const [openComments, setOpenComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(true);
  const [loader, setLoader] = useState(true);
  const [commentErrorId, setCommentErrorId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const requestedPost = await getPostDetails(selectedPostId);

      setOpenPost(requestedPost);
    }

    fetchData();
  }, [selectedPostId]);

  useEffect(() => {
    async function fetchData() {
      const requestedComment = await getPostComments(openPost.id);

      setOpenComments(requestedComment);
    }

    fetchData();
    setLoader(false);
  }, [openPost.id]);

  const commentsVisibility = () => {
    setHiddenComments(currentHiddenComments => !currentHiddenComments);
  };

  const removeComment = async(commentIdForRemove) => {
    const response = await deleteCommentFromServer(commentIdForRemove);

    if (response === 'Error') {
      setCommentErrorId(commentIdForRemove);

      return;
    }

    const filteredComments = openComments.filter(comment => (
      comment.id !== commentIdForRemove
    ));

    setOpenComments(filteredComments);
  };

  return (
    <>
      {loader
        ? <Loader />
        : (
          <div className="PostDetails App__PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{openPost.body}</p>
            </section>

            <section className="PostDetails__comments">
              {openComments.length === 0
                ? <p className="PostDetails__noCommentsMessage">No comments</p>
                : (
                  <>
                    <button
                      type="button"
                      className="button PostDetails__showCommentsButton"
                      onClick={commentsVisibility}
                    >
                      {hiddenComments
                        ? `Show ${openComments.length} comment(s)`
                        : `Hide ${openComments.length} comment(s)`
                      }
                    </button>

                    {!hiddenComments && (
                      <ul className="PostDetails__list">
                        {openComments.map(comment => (
                          <Comment
                            key={comment.id}
                            commentErrorId={commentErrorId}
                            commentId={comment.id}
                            commentBody={comment.body}
                            removeComment={removeComment}
                          />
                        ))}
                      </ul>
                    )}
                  </>
                )}
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  onAdd={setOpenComments}
                  postId={openPost.id}
                />
              </div>
            </section>
          </div>
        )}
    </>
  );
}

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
