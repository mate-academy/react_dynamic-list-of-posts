import React, { useEffect, useState } from 'react';
import { deleteCommentById, getCommentsByPostId } from '../../api/comments';
import { getPostById } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postId: number,
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentFormat[]>([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(false);

  async function loadPost() {
    const postFromServer = await getPostById(postId);

    setPost(postFromServer);
  }

  const loadComments = async () => {
    const commentsFromServer = await getCommentsByPostId(postId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const handleDeleteCommentButton = async (commentId: number) => {
    const deletedComment = await deleteCommentById(commentId);

    if (deletedComment) {
      loadComments();
    }
  };

  return (
    <>
      {post
        ? (
          <div className="PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post?.title}</p>
            </section>

            {comments.length
              ? (
                <section className="PostDetails__comments">
                  <button
                    type="button"
                    className="button"
                    onClick={() => setIsCommentsHidden(currentValue => !currentValue)}
                  >
                    {isCommentsHidden
                      ? 'Show comments'
                      : 'Hide comments'}
                  </button>

                  <ul className="PostDetails__list">
                    {!isCommentsHidden && comments.map(comment => (
                      <li key={comment.id} className="PostDetails__list-item">
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => handleDeleteCommentButton(comment.id)}
                        >
                          X
                        </button>

                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )
              : (
                <h3>No comments yet</h3>
              )}

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={postId}
                  updateComments={loadComments}
                />
              </div>
            </section>
          </div>
        )
        : (
          <div className="alert alert-danger" role="alert">
            <h2>Post not found</h2>
          </div>
        )}
    </>
  );
};
