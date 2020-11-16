import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getPostComments, deleteCommentFromServer } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader';
import { Comments } from '../Comments';

export const PostDetails = ({ selectedPostId }) => {
  const [hiddenComments, setHiddenComments] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(true);
  const [commentErrorId, setCommentErrorId] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      const requestedPost = await getPostDetails(selectedPostId);

      setPost(requestedPost);
    };

    fetchData();
  }, [selectedPostId]);

  useEffect(() => {
    const fetchData = async() => {
      const requestedComment = await getPostComments(post.id);

      setComments(requestedComment);
    };

    fetchData();
    setLoader(false);
  }, [post.id]);

  const showComments = useCallback(() => {
    setHiddenComments(currentHidenComments => !currentHidenComments);
  }, []);

  const deleteComment = useCallback(async(commentIdToDelete) => {
    const response = await deleteCommentFromServer(commentIdToDelete);

    if (response === 'Error') {
      setCommentErrorId(commentIdToDelete);

      return;
    }

    const filteredComments = comments.filter(comment => (
      comment.id !== commentIdToDelete
    ));

    setComments(filteredComments);
  }, [comments]);

  return (
    <>
      {loader
        ? <Loader />
        : (
          <div className="PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length === 0
                ? <p>No comments</p>
                : (
                  <>
                    <button
                      type="button"
                      className="button"
                      onClick={showComments}
                    >
                      {hiddenComments
                        ? `Show ${comments.length} comment(s)`
                        : `Hide ${comments.length} comment(s)`
                      }
                    </button>

                    {!hiddenComments && (
                      <ul className="PostDetails__list">
                        {comments.map(comment => (
                          <Comments
                            key={comment.id}
                            commentId={comment.id}
                            commentErrorId={commentErrorId}
                            deleteComment={deleteComment}
                            commentBody={comment.body}
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
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
