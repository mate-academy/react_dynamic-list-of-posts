import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getComments, removeComment } from '../../api/comments';

interface Props {
  selectedPost: Post;
}

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPost } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const getComment = async () => {
      const response = await getComments(selectedPost.id);

      setComments(response);
    };

    getComment();
  }, [comments]);

  const whatNeedShow = showComments ? `Hide ${comments.length} comments` : 'Show comments';

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {selectedPost.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button type="button" className="button" onClick={() => setShowComments(!showComments)}>
          {comments.length > 0 ? whatNeedShow : 'Not comment yet'}
        </button>

        <ul className="PostDetails__list">
          {showComments && comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => removeComment(comment.id)}
              >
                X
              </button>
              <p>
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm comments={comments} postId={selectedPost.id} />
        </div>
      </section>
    </div>
  );
};
