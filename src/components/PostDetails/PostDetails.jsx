import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './PostDetails.scss';

import { Loader } from '../Loader';
import { CommentInfo } from '../CommentInfo';
import { NewCommentForm } from '../NewCommentForm';

import { getPostDetails } from '../../api/posts';
import { getPostComments, addComment, removeComment } from '../../api/comments';

export const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);

  const add = async(newComment) => {
    await addComment(newComment);

    setComments([...comments, newComment]);
  };

  const remove = async(removedCommentId) => {
    await removeComment(removedCommentId);
    const filteredComments = comments.filter(
      comment => removedCommentId !== comment.id,
    );

    setComments(filteredComments);
  };

  useEffect(() => {
    const getDetails = async() => {
      const postFromServer = await getPostDetails(postId);

      setPost(postFromServer);
    };

    const getComments = async() => {
      const commentsFromServer = await getPostComments(postId);

      setComments(commentsFromServer);
    };

    getDetails();
    getComments();
  }, [postId]);

  return (
    <>
      {!post ? (
        <Loader />
      ) : (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          {!!comments.length && (
            <CommentInfo
              commentsLength={comments.length}
              comments={comments}
              remove={remove}
            />
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                add={add}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};
PostDetails.propTypes = {
  postId: PropTypes.number.isRequired,
};
