import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/api';
import { deleteComment } from '../../api/delete';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
  body: string;
};

export const PostDetails: React.FC<Props> = ({
  postId,
  body,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [buttonTogler, setTogler] = useState(true);

  const loadComments = () => {
    getPostComments(postId)
      .then((respond) => setComments(respond));
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className="button"
              onClick={() => setTogler(prev => !prev)}
            >
              {`${buttonTogler ? 'Hide' : 'Show'} ${comments.length} comments`}
            </button>
          ) : (
            'There are no comments here, be the first'
          )}

        {buttonTogler && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id).then(loadComments)}
                >
                  X
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
