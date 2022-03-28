import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { PostDetailsType, UserPost, PostCommentType } from '../../react-app-env';
import { getPostDetails, getPostComments } from '../../api/posts';

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
            <li key={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
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
          <NewCommentForm postId={selectedPostId} />
        </div>
      </section>
    </div>
  );
};
