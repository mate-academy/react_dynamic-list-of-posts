import React, { useEffect, useState } from 'react';
import {
  createComment,
  deleteComment,
  getPostComments,
  getPostDetails,
} from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = React.memo<Props>(
  ({ selectedPostId }) => {
    const [details, setDetails] = useState<Post>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsStatus, setCommentsStatus] = useState(true);
    const loadDetails = () => {
      getPostDetails(selectedPostId).then(loadedDetails => setDetails(loadedDetails));
    };

    const loadComments = () => {
      getPostComments(selectedPostId).then(loadedComments => setComments(loadedComments));
    };

    const addComment = (newComment: Comment) => {
      setComments([...comments, newComment]);
      createComment(newComment);
    };

    const displayComments = () => {
      setCommentsStatus(currCommentsStatus => !currCommentsStatus);
    };

    const removeComment = (commentId: number) => {
      setComments(comments.filter(comment => comment.id !== commentId));
      deleteComment(commentId);
    };

    useEffect(() => {
      loadComments();
      loadDetails();
    }, [selectedPostId]);

    return (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{details?.body}</p>
        </section>

        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={displayComments}
          >
            {commentsStatus ? (
              `Hide ${comments.length} comments`
            )
              : (
                `Show ${comments.length} comments`
              )}
          </button>

          {commentsStatus && (
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
          )}
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm addComment={addComment} postId={selectedPostId} />
          </div>
        </section>
      </div>
    );
  },
);
interface Props {
  selectedPostId: number,
}
