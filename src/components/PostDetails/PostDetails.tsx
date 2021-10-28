import React, { useEffect, useState } from 'react';
import { getPostComments, getPostDetails, removeComment } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [details, setDetails] = useState('');
  const [areCommentsShown, setAreCommentsShown] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadDetails = () => {
    getPostDetails(postId)
      .then(detailsFromServer => {
        setDetails(detailsFromServer.body);
      });
  };

  const loadComments = () => {
    getPostComments(postId)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      });
  };

  useEffect(() => {
    loadDetails();
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details}</p>
      </section>

      <section className="PostDetails__comments">
        {!!comments.length && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setAreCommentsShown(current => !current);
            }}
          >
            {`${areCommentsShown
              ? 'Hide'
              : 'Show'
            } ${comments.length
            } comment${(comments.length === 1)
              ? ''
              : 's'}`}
          </button>
        )}

        {areCommentsShown && (
          comments.map((comment: Comment) => (
            <ul
              key={comment.id}
              className="PostDetails__list"
            >
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComment(`${comment.id}`)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            </ul>
          ))
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
