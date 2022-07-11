/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { getPostComments, deleteComment } from '../../api/comments';

type Props = {
  selectedPostId: number;
};

type ForComments = Comment[] | null;

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<ForComments>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isNewComment, setIsNewComment] = useState<boolean>(false);

  useEffect(() => {
    setPost(null);
    setShowComments(true);

    getPostDetails(selectedPostId)
      .then(postsFromServ => setPost(postsFromServ))
      .catch((err) => {
        console.log(`${err}`);
        setPost(null);
      });

    getPostComments(selectedPostId)
      .then((commentsFromServ) => setComments(commentsFromServ))
      .catch((err) => {
        console.log(`${err}`);
      });
  }, [selectedPostId, isNewComment]);

  const showHideComments = () => setShowComments(state => !state);

  const removeComment = (id: number) => {
    deleteComment(id);
    if (comments) {
      setComments(comments.filter(item => item.id !== id));
    }
  };

  return (
    <div className="PostDetails">
      {post && (
        <>
          <h2>{`Post #${post.id} details:`}</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>
        </>
      )}

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button PostDetails__show-button"
          onClick={showHideComments}
        >
          {showComments
            ? 'Hide comment(-s)'
            : 'Show comment(-s)'}
        </button>

        {showComments && comments && (
          <ul className="PostDetails__list" data-cy="postDetails">
            {comments.map((comment) => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComment(comment.id)}
                >
                  X
                </button>
                <div className="PostDetails__list-item--body">
                  <p>{comment.body}</p>
                  <p>{comment.name}</p>
                  <p>{comment.updatedAt}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            onNewComment={setIsNewComment}
          />
        </div>
      </section>
    </div>
  );
};
