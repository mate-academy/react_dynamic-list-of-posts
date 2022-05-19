import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, createComment } from '../../api/comments';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postDetailsId => {
        setPostDetails(postDetailsId);
      });

    getPostComments(selectedPostId)
      .then(commentsPostId => {
        setComments(commentsPostId);
      });
  }, [selectedPostId]);

  const handleVisibleComments = () => {
    setVisibleComments(currentState => !currentState);
  };

  const deleteCommentId = (commentId: number) => {
    deleteComment(commentId);
    setComments((currentCommets) => currentCommets.filter(comment => comment.id !== commentId));
  };

  const addComment = (name: string, email: string, body: string) => {
    createComment(selectedPostId, name, email, body)
      .then(createdComment => {
        setComments(currentCommets => [...currentCommets, createdComment]);
      });
  };

  return (
    <div className="PostDetails">
      {postDetails && (
        <>
          <h2>Post details:</h2>
          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>
        </>
      )}

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleVisibleComments}
        >
          { visibleComments ? `Hide ${comments.length} comments` : 'Show comments'}
        </button>

        { visibleComments && (
          <ul className="PostDetails__list">
            { comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteCommentId(comment.id)}
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
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};
