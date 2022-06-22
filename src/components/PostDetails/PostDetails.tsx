import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Post, Comment } from '../../react-app-env';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comment';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const commentsGetter = async () => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  const postDetailsGetter = async () => {
    const postFromServer = await getPostDetails(selectedPostId);

    setPost(postFromServer);
  };

  useEffect(() => {
    commentsGetter();
    postDetailsGetter();
  }, [selectedPostId]);

  const deleteHandler = async (id: number) => {
    await deleteComment(id);
    const refreshedComments = await getPostComments(selectedPostId);

    setComments(refreshedComments);
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
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? 'Hide comments' : 'Show comments'}
        </button>
        {isVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  onClick={() => {
                    deleteHandler(comment.id);
                  }}
                  className="PostDetails__remove-button button"
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
            commentsGetter={commentsGetter}
          />
        </div>
      </section>
    </div>
  );
};
