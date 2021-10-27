import React, { useEffect, useState } from 'react';
import { addComment, getComments, removeComment } from '../../api/comments';
import { getPost } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPost: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [visibilityComments, setVisibilityComments] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPost(selectedPost)
      .then(data => {
        const [postFromServer] = data;

        setPost(postFromServer);
      });
    getComments(selectedPost)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      });
    setVisibilityComments(true);
  }, [selectedPost]);

  const addCommentAfterSubmit = (newComment: Partial<Comment>) => {
    addComment(newComment)
      .then(addedComment => {
        setComments(prev => [...prev, addedComment]);
      });
  };

  return (

    <div className="PostDetails">
      <h2>Post details:</h2>
      {post !== null && (
        <section className="PostDetails__post">
          <p>{post.body}</p>
          <p>test</p>
        </section>
      )}

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setVisibilityComments(prev => !prev)}
          >
            {`${visibilityComments ? 'Hide' : 'Show'} ${comments.length} comments`}
          </button>
        )}

        {visibilityComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    removeComment(comment.id);
                    setComments(prev => prev.filter(prevComment => prevComment.id !== comment.id));
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
            postId={selectedPost}
            addCommentAfterSubmit={addCommentAfterSubmit}
          />
        </div>
      </section>
    </div>
  );
};
