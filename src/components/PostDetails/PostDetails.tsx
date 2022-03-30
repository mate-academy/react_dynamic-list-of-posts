import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, removePostComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isHidden, setIsHidden] = useState(false);

  const fetchPostComments = async () => {
    const recievedComments = await getPostComments(postId);

    setComments(recievedComments);
  };

  const fetchPostDetails = async () => {
    const recievedPost = await getPostDetails(postId);

    setPost(recievedPost);
  };

  useEffect(() => {
    if (postId) {
      fetchPostDetails();
      fetchPostComments();
    }
  }, [postId]);

  const updateAfterRemoveComment = (commentId: number) => {
    removePostComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setIsHidden(!isHidden)}
            >
              {`${isHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
            </button>

            {!isHidden && (
              <ul className="PostDetails__list">
                {comments.map((comment) => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => updateAfterRemoveComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
