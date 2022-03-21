import React, { useEffect, useState } from 'react';
import {
  addComment,
  deleteComment,
  getPostComments,
  getPostDetails,
} from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;

  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => setPost(response));

    getPostComments(selectedPostId)
      .then(response => setComments(response));
  }, [selectedPostId]);

  const deleteCommentServer = async (commentId: number) => {
    deleteComment(commentId);
    setComments(comments.filter(com => com.id !== commentId));
  };

  const addNewComment = (newComment: Partial<Comment>) => {
    addComment(newComment)
      .then(response => setComments([...comments, response]));
  };

  const handleChange = () => {
    setVisible(!isVisible);
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="PostDetails">
      {selectedPostId !== 0
        ? (
          <>
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>

            <section className="PostDetails__comments">
              <button type="button" className="button" onClick={handleChange}>
                {isVisible
                  ? `Hide ${comments.length} comments`
                  : `Show ${comments.length} comments`}
              </button>

              <ul className="PostDetails__list">
                {isVisible && (
                  <>
                    {comments.map(comment => (
                      <li className="PostDetails__list-item" key={comment.id}>
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => deleteCommentServer(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  selectedPostId={selectedPostId}
                  addNewComment={addNewComment}
                />
              </div>
            </section>
          </>
        )
        : (
          <h2>Not selected posts yet</h2>
        )}
    </div>
  );
};
