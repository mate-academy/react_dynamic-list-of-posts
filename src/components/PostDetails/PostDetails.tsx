import React, { useState, useEffect } from 'react';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);

  const loadPostDetails = async () => {
    const selectedPost = await getPostDetails(selectedPostId);

    setPost(selectedPost);
  };

  const loadComments = async () => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadPostDetails();
    loadComments();
  }, [selectedPostId]);

  const handleCommentDelete = async (commentId: number) => {
    await deleteComment(commentId);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2> Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {isCommentsHidden ? (
          <button
            type="button"
            className="button"
            onClick={() => setIsCommentsHidden(!isCommentsHidden)}
          >
            {`Show ${comments.length} comments`}
          </button>
        ) : (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setIsCommentsHidden(!isCommentsHidden)}
            >
              {`Hide ${comments.length} comments`}
            </button>

            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            loadComments={loadComments}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
