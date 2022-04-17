import React, { useEffect, useState } from 'react';
import { getPostComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isVisibleComments, setIsVisibleComments] = useState(true);
  const [postComments, setPostComments] = useState <Comment[]>([]);

  const fetchDetails = () => {
    getPostDetails(selectedPostId)
      .then(details => setPostDetails(details));
  };

  const fetchComments = () => {
    getPostComments(selectedPostId)
      .then(comments => setPostComments(comments));
  };

  useEffect(() => {
    Promise.all([fetchDetails(), fetchComments()]);
  }, [selectedPostId, isVisibleComments]);

  const showComments = () => {
    setIsVisibleComments(!isVisibleComments);
  };

  const addNewComment = (newComment: Comment) => {
    setPostComments([
      ...postComments,
      newComment,
    ]);
  };

  const removeComment = (commentId: string) => {
    deleteComment(commentId)
      .then(deletedComment => {
        if (deletedComment) {
          setPostComments(
            postComments.filter(comment => comment.id !== commentId),
          );
        }
      });
  };

  const { length } = postComments;

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {length
          ? (
            <button
              type="button"
              className="button"
              hidden={length < 1}
              onClick={showComments}
            >
              {
                `${isVisibleComments ? 'Hide' : 'Show'}
                 ${length}
                 ${length < 2 ? 'comment' : 'comments'}`
              }
            </button>
          ) : (
            <p
              className="PostDetails__list-item"
            >
              No comments yet. You can leave a comment first &#9660;
            </p>
          )}

        {isVisibleComments
          && (
            <ul
              className="PostDetails__list"
            >
              {postComments.map(({ id, body }) => (
                <li
                  key={id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__x"
                    onClick={() => removeComment(id)}
                  >
                    <p>&#10060;</p>
                  </button>
                  <p>
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onAdd={addNewComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
