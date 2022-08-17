import { useEffect, useMemo, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { deleteComment } from '../../api/comments';
import { Loader } from '../Loader';
import { getComments } from './getComments';

interface Props {
  post: Post;
  postId: number;
}

export const PostDetails = ({ post, postId }: Props) => {
  const [isHide, setIsHide] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const valueBtn = useMemo(() => {
    const value = `${comments.length} comment${comments.length > 1 ? 's' : ''}`;

    if (isHide) {
      return `Show ${value}`;
    }

    return `Hide ${value}`;
  }, [isHide, comments]);

  useEffect(() => {
    getComments(postId, setComments, setIsLoading);
  }, [postId]);

  const removeComment = async (commentId: number) => {
    setIsLoading(true);

    await deleteComment(commentId);

    getComments(postId, setComments, setIsLoading);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {isLoading ? (
        <Loader />
      ) : (
        <section className="PostDetails__comments">
          {!isHide ? (
            <button
              type="button"
              className="button"
              onClick={() => setIsHide(true)}
            >
              {valueBtn}
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => setIsHide(false)}
            >
              {valueBtn}
            </button>
          )}

          {!isHide && (
            <ul className="PostDetails__list" data-cy="postList">
              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
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
          )}
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setIsLoading={setIsLoading}
            updateComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};
