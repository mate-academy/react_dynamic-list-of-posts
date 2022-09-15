import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: string | null;
  setSelectedPostId: (postId: string | null) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPostId,
  setSelectedPostId,
}) => {
  // eslint-disable-next-line no-console
  console.log('render PostDetails');

  const [postComments, setPostComments] = useState([]);
  const [postDetails, setPostDetails] = useState<PostDetailsType | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [showLoaderPostsDetails, setShowLoaderPostsDetails] = useState(false);

  const counterComments = postComments.length;

  const loadPostDetails = async () => {
    setShowLoaderPostsDetails(true);

    try {
      const [commentsFromServer, postDetailsFromServer] = await Promise.all([
        getPostComments(selectedPostId),
        getPostDetails(selectedPostId),
      ]);

      setPostComments(commentsFromServer);
      setPostDetails(postDetailsFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    } finally {
      setShowLoaderPostsDetails(false);
    }
  };

  useEffect(() => {
    if (selectedPostId) {
      loadPostDetails();
    }
  },
  [
    selectedPostId,
  ]);

  const onDeleteButton = (commentId: string) => {
    deleteComment(commentId).then(() => {
      const currentPostId = selectedPostId;

      setSelectedPostId(null);
      setSelectedPostId(currentPostId);
    });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails && (
        <section className="PostDetails__post">
          <strong>{`${postDetails.title}`}</strong>
          <p>{postDetails.body}</p>
        </section>
      )}

      {showLoaderPostsDetails ? (
        <Loader />
      ) : (
        <section className="PostDetails__comments">
          {(counterComments > 0) && (
            <button
              type="button"
              className="PostDetails__button button"
              onClick={() => setShowComments(!showComments)}
            >
              { showComments
                ? `Hide ${counterComments} comments`
                : 'Show comments' }
            </button>
          )}

          { showComments && (
            <ul
              className="PostDetails__list"
              data-cy="postList"
            >
              {postComments.map((comment: CommentType) => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    formMethod="DELETE"
                    onClick={() => onDeleteButton(comment.id)}
                  >
                    X
                  </button>
                  <p>
                    <strong>{comment.name ? `${comment.name}: ` : 'noname: '}</strong>
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            loadPostDetails={loadPostDetails}
          />
        </div>
      </section>
    </div>
  );
});
