import React, { useEffect, useState } from 'react';
import { deleteCommentFromServer, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Partial<Post>;
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { post, selectedPostId } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisibleComments, setIsVisibleComments] = useState(true);
  const [forUpdateComments, setForUpdateComments] = useState(true);

  const changeCommentsVisibility = () => {
    setIsVisibleComments(!isVisibleComments);
  };

  useEffect(() => {
    (async () => {
      const selectedPostComments = await getPostComments(post.id || 0);

      setComments(selectedPostComments);
    })();
  }, [post, forUpdateComments]);

  const updateComment = () => {
    setForUpdateComments(!forUpdateComments);
  };

  const deleteComment = async (commentId: number) => {
    await deleteCommentFromServer(commentId);
    updateComment();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {post.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 ? (
          <button
            type="button"
            className="button"
            onClick={changeCommentsVisibility}
          >
            {isVisibleComments
              ? 'Hide '
              : 'Show '}
            {`${comments.length} comments`}
          </button>
        ) : (
          'There are no comments yet'
        )}
        <ul className="PostDetails__list">
          {isVisibleComments && (
            comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            updateComment={updateComment}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
