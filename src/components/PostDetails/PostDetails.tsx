import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/api';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  const loadComments = () => {
    getPostComments()
      .then(commentsFromServer => {
        const commentsByPostId = commentsFromServer
          .filter(comment => comment.postId === selectedPostId);

        setComments(commentsByPostId);
      });
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then((postFromServer: Post) => {
        setPost(postFromServer);
      });
    loadComments();
  }, [selectedPostId]);

  useEffect(() => {
    loadComments();
  }, []);

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
          onClick={() => {
            return (showComments) ? setShowComments(false) : setShowComments(true);
          }}
        >
          {(showComments) ? (
            `Hide ${comments.length} comment${(comments.length > 1) ? 's' : ''}`
          ) : (
            `Show ${comments.length} comment${(comments.length > 1) ? 's' : ''}`
          )}
        </button>
        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment?.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment?.id)
                    .then(loadComments)}
                >
                  X
                </button>
                <p>{comment?.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
