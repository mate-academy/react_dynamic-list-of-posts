import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../../types/post';
import { Comment } from '../../types/comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number;
};

function verifyUniqueCommentId(
  existingComments: Comment[],
  newComment: Comment,
): boolean {
  const existingIds = existingComments.map(({ id }) => id);

  return !existingIds.includes(newComment.id);
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | []>([]);
  const [areCommentsVisible, setCommentsVisibility] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => Promise.all([
      getPostDetails(selectedPostId),
      getPostComments(selectedPostId),
    ]);

    loadData().then(([post, comments]) => {
      setPostDetails(post);
      setPostComments(comments);
    });
  }, [selectedPostId]);

  const deleteComment = useCallback((commentId: number) => {
    const updatedComments = postComments.filter(({ id }) => id !== commentId);

    setPostComments(updatedComments);
  }, [postComments]);

  const addNewComment = useCallback((newComment: Comment) => {
    if (!verifyUniqueCommentId(postComments, newComment)) {
      const updatedComment = {
        ...newComment,
        id: newComment.id + 1,
      };

      addNewComment(updatedComment);
    } else {
      setPostComments([newComment, ...postComments]);
    }
  }, [postComments]);

  return postDetails && (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      {postComments.length && (
        <>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setCommentsVisibility(!areCommentsVisible)}
            >
              {`${areCommentsVisible ? 'Hide' : 'Show'} ${postComments.length} comments`}
            </button>

            {areCommentsVisible && (
              <ul className="PostDetails__list" data-cy="postDetails">
                {postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
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
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm addNewComment={addNewComment} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
