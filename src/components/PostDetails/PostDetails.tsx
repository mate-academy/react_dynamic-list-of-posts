import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Comment, NewComment, Post } from '../../react-app-env';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    (async () => {
      const [loadedPostDetails, loadedComments] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      setPostDetails(loadedPostDetails);
      setComments(loadedComments);
    })();
  }, [selectedPostId]);

  const removeComment = (commentId: number) => {
    deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const addingComment = async (comment: NewComment) => {
    const newComment = await addComment(comment);

    setComments([...comments, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post detail:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Hide comments' : 'Show comments'}
        </button>

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
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

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            onAddComment={addingComment}
          />
        </div>
      </section>
    </div>
  );
};
