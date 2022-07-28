import React, { useEffect, useState } from 'react';
import { deletePostComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  details: Post | null,
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({
  details,
  selectedPostId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCmntsVisible, setCmntsVisible] = useState(false);
  const [isRefreshedComment, refreshComent] = useState(false);

  useEffect(() => {
    if (selectedPostId === details?.id || isRefreshedComment) {
      getPostComments(selectedPostId)
        .then(currentPostComments => setComments(currentPostComments));
    }

    refreshComent(false);
  }, [details?.id, isRefreshedComment]);

  if (!details) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setCmntsVisible(!isCmntsVisible)}
          >
            {isCmntsVisible
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>
        )}

        {isCmntsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => {
              const deleteComment = () => {
                deletePostComment(comment.id);
                refreshComent(true);
              };

              return (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={deleteComment}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            onRefreshComent={refreshComent}
          />
        </div>
      </section>
    </div>
  );
};
