import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { PostComments } from '../PostComments';
import { getPostDetails } from '../../api/posts';
import { getComments } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isCommentsHide, setIsCommentsHide] = useState(false);

  useEffect(() => {
    async function fetchServer() {
      const [commentsFromServer, postFromServer] = await Promise.all([
        getComments(postId), getPostDetails(postId),
      ]);

      setComments(commentsFromServer);
      setPost(postFromServer);
    }

    fetchServer();
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {post.body ? <p>{post.body}</p> : <Loader />}
      </section>

      {comments.length > 0 ? (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => {
              setIsCommentsHide(!isCommentsHide);
            }}
          >
            {`${isCommentsHide ? 'Show' : 'Hide'} ${comments.length} comments`}
          </button>

          <ul className="PostDetails__list">
            {!isCommentsHide && (
            <PostComments
              comments={comments}
              postId={postId}
              setComments={setComments}
            />
            )}
          </ul>

        </section>
      ) : (<p>No comments yet</p>)}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  postId: PropTypes.number,
};

PostDetails.defaultProps = {
  postId: undefined,
};
