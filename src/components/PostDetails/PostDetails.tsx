import React, { useCallback, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post } from '../../types/post';
import { getPostDetails } from '../../api/posts';
import { deleteComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/coment';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = React.memo(({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const onCommentVisibilityChange = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await getPostDetails(postId);

      setPostDetails(response);
    };

    const fetchPostComments = async () => {
      const response = await getPostComments(postId);

      setComments(response);
    };

    try {
      fetchPostDetails();
    } catch (error) {
      throw new Error(`${error}`);
    }

    try {
      fetchPostComments();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, [postId]);

  const onCommentDeleting = useCallback(async (commentId) => {
    await deleteComment(commentId);

    const filteredComments = [...comments].filter(
      comment => comment.id !== commentId,
    );

    await setComments(filteredComments);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={onCommentVisibilityChange}
        >
          {isCommentsVisible ? 'Hide comments' : 'Show comments'}
        </button>

        {isCommentsVisible && (
          <ul data-cy="postDetails" className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => onCommentDeleting(comment.id)}
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
            postId={postId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
});
