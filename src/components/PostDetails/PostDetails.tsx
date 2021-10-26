import React, { useState, useEffect } from 'react';
import { loadPostComments, uploadComment, deleteComment } from '../../api/comments';
import { loadPost } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isHiddenComments, setIsHiddenComments] = useState(false);

  useEffect(() => {
    loadPost(selectedPostId).then(loadedDetails => setSelectedPost(loadedDetails));
    loadPostComments(selectedPostId).then(loadedComments => setComments(loadedComments));
  }, [selectedPostId]);

  const addComment = (newComment: Partial<Comment>) => {
    uploadComment(newComment)
      .then(() => {
        loadPostComments(selectedPostId).then(loadedComments => setComments(loadedComments));
      });
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        loadPostComments(selectedPostId).then(loadedComments => setComments(loadedComments));
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.body}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => setIsHiddenComments(!isHiddenComments)}
          >
            {`${!isHiddenComments ? 'Hide' : 'Show'} `
             + `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
          </button>

          <ul className="PostDetails__list">
            {isHiddenComments || (
              comments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
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
              ))
            )}
          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            onAddComments={addComment}
          />
        </div>
      </section>
    </div>
  );
};
