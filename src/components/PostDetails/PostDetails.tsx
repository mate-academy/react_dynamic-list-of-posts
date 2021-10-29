import React, { useEffect, useState } from 'react';
import { getComments } from '../../api/api';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
  posts: Post[];
};

export const PostDetails: React.FC<Props> = ({ postId, posts }) => {
  const filtredPost = posts.filter(post => post.id === postId);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setVisible] = useState(true);

  const addComment = (name: string, email: string, body: string) => {
    const maxId = Math.max(...comments.map(c => c.id));
    const newComment = {
      id: maxId + 1,
      postId: filtredPost[0].id,
      name,
      email,
      body,
    };

    setComments([...comments, newComment]);
  };

  useEffect(() => {
    getComments()
      .then(setComments);
  }, []);

  const commentsById = comments.filter(comment => comment.postId === postId);
  const deleteComment = (commentId: number) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);

    setComments(updatedComments);
  };

  const hasComments = commentsById.length > 0;

  return (
    <div className="PostDetails">
      <h2>
        Post details:
        {filtredPost[0].id}
      </h2>

      <section className="PostDetails__post">
        <p>{filtredPost[0].body}</p>
      </section>

      <section className="PostDetails__comments">
        {hasComments

          ? (
            <>
              <button
                type="button"
                className="button"
                onClick={() => setVisible(!isVisible)}
              >
                Hide
                {' '}
                {commentsById.length}
                {' '}
                comments
              </button>

              {isVisible
            && (
              <ul className="PostDetails__list">
                {commentsById.map(comment => (
                  <li className="PostDetails__list-item">
                    <button
                      value={comment.id}
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
            </>
          )
          : <div>No comments</div>}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};
