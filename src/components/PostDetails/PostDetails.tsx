import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import './PostDetails.scss';
import { getPostComments, removeComment } from '../../api/comments';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Commentary[]>([]);
  const [commentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    async function result() {
      const postFromServer = await getPostDetails(selectedPostId);
      const commentsFromServer = await getPostComments(selectedPostId);

      setComments(commentsFromServer);
      setPost(postFromServer);
    }

    result();
  }, [selectedPostId]);

  const addNewComment = (newComment: Commentary) => {
    setComments([...comments, newComment]);
  };

  const handleRemoveComment = (id: number) => {
    removeComment(id);
    setComments(comments.filter(el => el.id !== id));
  };

  return (
    <div className="PostDetails" data-cy="postDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setCommentsVisible(state => !state)}
          >
            {commentsVisible
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>
        )}

        {commentsVisible && (
          <ul className="PostDetails__list">
            {comments.map((comment) => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleRemoveComment(comment.id)}
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
            addNewComment={addNewComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
