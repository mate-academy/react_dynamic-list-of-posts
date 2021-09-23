import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Partial<Post>;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { post } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisibleComments, setIsVisibleComments] = useState(true);

  const changeCommentsVisibility = () => {
    setIsVisibleComments(!isVisibleComments);
  };

  useEffect(() => {
    (async () => {
      const selectedPostComments = await getPostComments(post.id || 0);

      setComments(selectedPostComments);
    })();
  }, [post]);

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
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
