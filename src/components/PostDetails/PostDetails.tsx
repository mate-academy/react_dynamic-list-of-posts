import React, { useEffect, useState } from 'react';
import { getPostDetails, getPostComments } from '../../api/posts';
import { addNewComment, removeComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>();
  const [hideComments, setHideComments] = useState(false);

  const loadPostDetails = async () => {
    setPostDetails(
      await getPostDetails(selectedPostId),
    );
  };

  const loadPostComments = async () => {
    setPostComments(
      await getPostComments(selectedPostId),
    );
  };

  useEffect(() => {
    loadPostDetails();
    loadPostComments();
  }, [selectedPostId]);

  const handleRemoveComment = async (commentId: number) => {
    await removeComment(commentId)
      .then(() => loadPostComments());
  };

  const handleAddComment = async (comment: NewComment) => {
    await addNewComment(comment).then(() => loadPostComments());
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments?.length === 0 ? (
          <h3>There are no comments yet...</h3>
        ) : (
          <div className="PostDetails__buttons">
            <button
              type="button"
              className="button"
              onClick={() => setHideComments(!hideComments)}
            >
              {hideComments ? 'Show' : 'Hide'}
              {` ${postComments?.length} comments`}
            </button>
          </div>
        ) }
        {!hideComments && (
          <ul className="PostDetails__list" data-cy="postDetails">
            {postComments?.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    handleRemoveComment(comment.id);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            onAddNewComment={handleAddComment}
          />
        </div>
      </section>
    </div>
  );
};
