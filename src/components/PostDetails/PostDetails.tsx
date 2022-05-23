import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostById } from '../../api/posts';
import { Post, Comment } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = memo(({
  selectedPostId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const getSelectedPost = () => (
    getPostById(selectedPostId).then(data => setSelectedPost(data))
  );

  const getComments = () => {
    getPostComments(selectedPostId)
      .then(comment => setComments(comment));
  };

  const changeCommentsVisibility = () => (
    setIsCommentsVisible(!isCommentsVisible)
  );

  const commentDeleter = (commentId = 0) => {
    deleteComment(commentId)
      .then(commentForDelete => {
        if (commentForDelete) {
          const filteredComments = comments.filter(
            comment => comment.id !== commentId,
          );

          setComments(filteredComments);
        }
      });
  };

  const newComment = useCallback((
    name: string,
    email: string,
    body: string,
  ) => {
    const addedComment = {
      id: Number(uuidv4()),
      postId: selectedPostId,
      name,
      email,
      body,
    };

    setComments((prev) => (
      [...prev, addedComment]
    ));

    addComment(addedComment);
  }, [comments]);

  useEffect(() => {
    getSelectedPost();
    getComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className="button"
              onClick={changeCommentsVisibility}
            >
              {
                isCommentsVisible
                  ? `Hide ${comments?.length} comments`
                  : `Show ${comments?.length} comments`
              }
            </button>
          )
          : (
            <p>No comments yet</p>
          )}

        {
          !isCommentsVisible
            ? ''
            : (
              <ul className="PostDetails__list">
                {comments.map((comment) => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => commentDeleter(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm newComment={newComment} />
        </div>
      </section>
    </div>
  );
});
