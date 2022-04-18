import React, { useCallback, useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment, FetchComment } from '../../types/Comment';
import './PostDetails.scss';
import { NewCommentForm } from '../NewCommentForm';

interface Props {
  selectedPostId: number
}

export const PostDetails: React.FC<Props> = React.memo(({ selectedPostId }) => {
  const [details, setDetails] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  const loadBody = (postId: number) => {
    getPostDetails(postId)
      .then(setDetails);
  };

  const loadComments = (postId: number) => {
    getPostComments(postId)
      .then(setComments);
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(response => {
        if (response) {
          setComments(comments.filter(comment => comment.id !== commentId));
        }
      });
  };

  const createComment = useCallback((newComment: FetchComment) => {
    addComment(newComment)
      .then(response => {
        setComments(currentComments => [...currentComments, response]);
      });
  }, [comments]);

  useEffect(() => {
    Promise.all([loadBody(selectedPostId), loadComments(selectedPostId)]);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {details?.body}
        </p>
      </section>

      {
        comments.length > 0
        && (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(!showComments)}
            >
              {
                showComments
                  ? `Hide ${comments.length} comment${comments.length !== 1 ? 's' : ''}`
                  : `Show ${comments.length} comment${comments.length !== 1 ? 's' : ''}`
              }
            </button>

            {
              showComments
                && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li
                        key={comment.id}
                        className="PostDetails__list-item"
                      >
                        <button
                          type="button"
                          className="PostDetails__remove--button button"
                          onClick={() => removeComment(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                )
            }
          </section>
        )
      }

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            createComment={createComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
});
