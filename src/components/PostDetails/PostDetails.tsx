import React, { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const loadPosts = async () => {
    const postFromServer = await getPostDetails(postId);

    setPost(postFromServer);
  };

  const loadComments = async () => {
    const commentsFromServer = await getPostComments(postId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadPosts();
    loadComments();
  }, [postId]);

  const handleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const handleCommentDelete = async (commentId: number) => {
    await deleteComment(commentId);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleCommentsVisibility}
        >
          {isCommentsVisible ? 'Hide comments' : 'Show comments'}
        </button>

        {isCommentsVisible && (
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
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            loadComments={loadComments}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
