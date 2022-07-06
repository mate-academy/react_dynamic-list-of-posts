import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../react-app-env';
import { getComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [postDetailsLoaded, setPostDetailsLoaded] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>();
  const [hideComments, setHideComments] = useState(false);

  const loadComments = async () => {
    const commentsFromServer = await getComments(selectedPostId);

    setPostComments(commentsFromServer);
  };

  const loadPostDetails = async () => {
    const importedDetails = await getPostDetails(selectedPostId);

    setPostDetails(importedDetails);
    setPostDetailsLoaded(true);
  };

  const loadPostCommnets = async () => {
    const importedComments = await getComments(selectedPostId);

    setPostComments(importedComments);
  };

  useEffect(() => {
    loadPostDetails();
    loadPostCommnets();
  });

  const removePostComment = async (commentId: number) => {
    await removeComment(commentId);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails && postDetailsLoaded
        ? (
          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>
        )
        : <Loader />}

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setHideComments(!hideComments)}
        >
          {`${hideComments
            ? 'Show'
            : 'Hide'}
            ${postComments?.length} comments`}
        </button>

        {!hideComments && (
          <ul className="PostDetails__list">
            {postComments?.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removePostComment(comment.id)}
                >
                  X
                </button>
                <p>{`Comment By ${comment.name}: ${comment.body}`}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
