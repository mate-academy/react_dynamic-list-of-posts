import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getPostComments, deleteCommentFromServer } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader/Loader';
import { Comment } from '../Comment';

export function PostDetails({ selectedPostId }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(true);
  const [loader, setLoader] = useState(true);
  const [commentErrorId, setCommentErrorId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const requestedPost = await getPostDetails(selectedPostId);

      setPost(requestedPost);
    }

    fetchData();
  }, [selectedPostId]);

  useEffect(() => {
    async function fetchData() {
      const requestedComment = await getPostComments(post.id);

      setComments(requestedComment);
    }

    fetchData();
    setLoader(false);
  }, [post.id]);

  const commentsVisibility = useCallback(() => {
    setHiddenComments(currentHiddenComments => !currentHiddenComments);
  }, []);

  const removeComment = useCallback(async(commentIdForRemove) => {
    const response = await deleteCommentFromServer(commentIdForRemove);

    if (response === 'Error') {
      setCommentErrorId(commentIdForRemove);

      return;
    }

    const filteredComments = comments.filter(comment => (
      comment.id !== commentIdForRemove
    ));

    setComments(filteredComments);
  }, [comments]);

  return (
    <>
      {loader
        ? <Loader />
        : (
          <div className="PostDetails App__PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length === 0
                ? <p className="PostDetails__noCommentsMessage">No comments</p>
                : (
                  <>
                    <button
                      type="button"
                      className="button PostDetails__showCommentsButton"
                      onClick={commentsVisibility}
                    >
                      {hiddenComments
                        ? `Show ${comments.length} comment(s)`
                        : `Hide ${comments.length} comment(s)`
                      }
                    </button>

                    {!hiddenComments && (
                      <ul className="PostDetails__list">
                        {comments.map(comment => (
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
                  onAdd={setComments}
                  postId={post.id}
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
