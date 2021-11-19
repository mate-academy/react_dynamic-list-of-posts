import React, { useState, useEffect } from 'react';
import { getPostComments, deleteComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  post: Post,
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({ post, selectedPostId }) => {
  const [showComments, setShowComments] = useState(true);
  const [commentsFromServer, setCommentsFromServer] = useState<Comment[] | null>([]);
  const commentsState = commentsFromServer && !showComments ? 'Comments are hidden' : 'No Comments';

  const loadingPostComments = async () => {
    const comments = await getPostComments(selectedPostId);

    if (comments) {
      setCommentsFromServer(comments);
    }
  };

  const handleDeleteButton = async (id: number) => {
    const deletedComment = await deleteComment(id);

    if (deletedComment) {
      loadingPostComments();
    }
  };

  useEffect(() => {
    loadingPostComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {post && (
        <div>
          <section className="PostDetails__post">
            <p>{post?.title}</p>
          </section>

          <section className="PostDetails__comments">
            {commentsFromServer && commentsFromServer.length > 0 && (
              <button
                type="button"
                className="button"
                onClick={() => setShowComments(prevState => !prevState)}
              >
                {commentsFromServer && showComments ? 'Hide comments' : 'Show Comments'}
              </button>
            )}

            <ul className="PostDetails__list">
              {commentsFromServer
                && commentsFromServer.length > 0
                && showComments ? commentsFromServer.map(comment => (
                  <li
                    key={comment.id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleDeleteButton(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.name}</p>
                  </li>
                )) : (<p>{commentsState}</p>)}
            </ul>
          </section>
        </div>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            updateComments={loadingPostComments}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
