import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails, addCommentToTheServer } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<null | Post>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [areCommentsHidden, setAreCommentsHidden] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setPostDetails(result));

    getPostComments(selectedPostId)
      .then(result => setPostComments(result));
  }, [selectedPostId]);

  const handleComments = () => {
    setAreCommentsHidden(current => !current);
  };

  const deleteComment = async (commentId: number) => {
    await removeComment(commentId);
    const commentsFromServer = await getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
  };

  const onAddTheComment = async (newComment: Partial<Comment>) => {
    await addCommentToTheServer(newComment);

    const commentsFromServer = await getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      {postComments.length > 0 && (
        <section
          className="PostDetails__comments"
        >
          <button
            type="button"
            className="button"
            onClick={handleComments}
          >
            {`${!areCommentsHidden ? 'Hide' : 'Show'} `
            + `${postComments.length} comments`}
          </button>

          <ul className="PostDetails__list">
            {areCommentsHidden || postComments.map(postComment => (
              <li
                key={postComment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => (
                    deleteComment(postComment.id)
                  )}
                >
                  X
                </button>
                <p>{postComment.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onAddTheComment={onAddTheComment}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
