import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getSelectedPosts } from '../../api/posts';
import { getComments, postNewComment, deleteComment } from '../../api/comments';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = (props) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isHide, setHide] = useState(true);
  const { selectedPostId } = props;

  useEffect(() => {
    getSelectedPosts(selectedPostId)
      .then(post => (
        setSelectedPost(post)
      ));

    getComments(selectedPostId)
      .then(commentsFromApi => (
        setComments([...commentsFromApi])
      ));
  }, [selectedPostId]);

  const handleClick = () => {
    setHide(!isHide);
  };

  if (selectedPostId === 0) {
    return (
      <div>Select a post</div>
    );
  }

  if (!selectedPost) {
    return (
      <div>Post not found</div>
    );
  }

  if (!comments) {
    return (
      <span>Comments not found</span>
    );
  }

  const addNewComment = (newComment: Partial<Comment>) => {
    postNewComment(newComment)
      .then(() => getComments(selectedPostId))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => getComments(selectedPostId))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleClick}
        >
          {isHide ? (
            `Hide ${comments.length} comments`
          ) : (
            `Show ${comments.length} comments`
          )}
        </button>
        {isHide && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
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
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            onAdd={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
