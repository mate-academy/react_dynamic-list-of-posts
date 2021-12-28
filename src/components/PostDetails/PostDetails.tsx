import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Post,
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ post, selectedPostId }) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsFromServer = await getPostComments(selectedPostId);

        setPostComments(commentsFromServer);
      } catch {
        Promise.reject(new Error('error'));
      }
    };

    if (selectedPostId !== 0) {
      fetchComments();
    }
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {showComments ? (
          <button
            type="button"
            className="button"
            onClick={() => setShowComments(false)}
          >
            {`Hide ${postComments.length} comments`}
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => setShowComments(true)}
          >
            {`Show ${postComments.length} comments`}
          </button>
        )}

        {showComments && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    setPostComments([...postComments].filter(c => c.id !== comment.id));
                  }}
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
            setPostComments={setPostComments}
            postComments={postComments}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
