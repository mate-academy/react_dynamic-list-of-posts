/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  PostDetailsType, UserPost, PostCommentType,
} from '../../react-app-env';
import {
  getPostDetails,
  getPostComments,
  sendData,
  deleteData,
} from '../../api/posts';

export const PostDetails: React.FC<PostDetailsType> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<UserPost | undefined>();
  const [isDisplayComment, setIsDisplayComment] = useState(false);
  const [postComments, setPostComments] = useState<PostCommentType[]>([]);

  useEffect(() => {
    if (selectedPostId >= 0) {
      getPostDetails(selectedPostId)
        .then(response => setPostDetails(response));
      getPostComments(selectedPostId)
        .then(respComment => setPostComments(respComment));
    }
  }, [selectedPostId]);

  const addPostComments = (newComment: PostCommentType) => {
    setPostComments([...postComments, newComment]);

    sendData(JSON.stringify(newComment), selectedPostId)
      .catch((error) => {
        throw new Error(error);
      });
  };

  const deletePostComment = (comment: React.MouseEvent<HTMLButtonElement>) => {
    const targetCommentId = comment.currentTarget.parentElement?.dataset.id;
    const newPostComments = postComments.filter((item) => `${item.id}` !== targetCommentId);

    deleteData(targetCommentId);

    setPostComments([...newPostComments]);
  };

  return (
    <div className="PostDetails">
      <h2>{`Post details: ${postDetails?.title}`}</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length !== 0 ? (
          <button
            type="button"
            className="button"
            onClick={() => setIsDisplayComment(!isDisplayComment)}
          >
            {isDisplayComment
              ? `Hide ${postComments.length} comments`
              : `Show ${postComments.length} comments`}
          </button>
        )
          : (<button type="button" className="button" disabled>No comments</button>)}
        <ul className="PostDetails__list">
          {isDisplayComment && postComments.map((comment) => (
            <li key={comment.id} data-id={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={(event) => deletePostComment(event)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={selectedPostId} postComments={addPostComments} />
        </div>
      </section>
    </div>
  );
};
