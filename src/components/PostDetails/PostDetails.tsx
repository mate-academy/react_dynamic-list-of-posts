import React, { useState, useEffect } from 'react';

import './PostDetails.scss';

import { CommentPost } from '../../types/Comment';
import { Post } from '../../types/Post';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

type Props = {
  postId: number | null;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postToShow, setPostToShow] = useState<Post>();
  const [commentsIsShown, setCommentsIsShown] = useState(false);
  const [commentsToShow, setCommentsToShow] = useState<CommentPost[]>();

  const loadComments = () => {
    getPostComments(postId)
      .then(comments => setCommentsToShow(comments));
  };

  useEffect(() => loadComments(), [commentsToShow]);

  useEffect(() => {
    getPostDetails(postId)
      .then(post => setPostToShow(post));
    getPostComments(postId)
      .then(comments => setCommentsToShow(comments));
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postToShow?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          onClick={() => setCommentsIsShown(!commentsIsShown)}
          type="button"
          className="button"
        >
          { `${!commentsIsShown ? 'Show' : 'Hide'} ${commentsToShow?.length || 'no'} comments` }
        </button>

        {commentsIsShown && (
          <ul className="PostDetails__list">
            {commentsToShow?.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                    loadComments();
                  }}
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>{comment.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} />
        </div>
      </section>
    </div>
  );
};
