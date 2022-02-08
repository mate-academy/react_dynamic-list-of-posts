import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, postComment } from '../../api/comments';

type Props = {
  selectedPostId: number | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const kostyl = async () => {
      const fetchedPost = await getPostDetails(selectedPostId);
      const fetchedComments = await getPostComments(selectedPostId);

      setPost(fetchedPost);
      setComments(fetchedComments);
    };

    kostyl();
  }, [selectedPostId]);

  const removeComment = (commentId: number) => {
    deleteComment(commentId);
    setComments((preComments) => preComments
      .filter(preComment => preComment.id !== commentId));
  };

  const addComment = (name: string, email: string, body: string) => {
    postComment(selectedPostId, name, email, body)
      .then(() => getPostComments(selectedPostId)
        .then(result => setComments(result)));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post && post.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => {
              if (hidden === false) {
                setHidden(true);
              } else {
                setHidden(false);
              }
            }}
          >
            {!hidden
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>
        )}

        <ul className="PostDetails__list">
          {comments && comments.map(comment => (
            <li
              className={classNames('PostDetails__list-item', { 'PostDetails__list-item--hidden': hidden })}
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => removeComment(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};
