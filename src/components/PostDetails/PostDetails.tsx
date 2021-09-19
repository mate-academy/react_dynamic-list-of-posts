import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postId: number;
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [curentPost, setCurentPost] = useState<PostDetails | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentsVisible, setCommentsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [fetchedPost, fetchedCommets] = await Promise.all([
        getPostDetails(postId),
        getPostComments(postId),
      ]);

      setCurentPost(fetchedPost);
      setComments(fetchedCommets);
      setLoading(false);
    })();
  }, [postId]);

  const handleCommentDelete = async (id: number) => {
    await deleteComment(id);

    setComments(comments.filter(comment => comment.id !== id));
  };

  const addNewComment = async (commentData: CommentResponse) => {
    const id = await addComment(commentData);

    const newComment = {
      id,
      body: commentData.body,
    };

    setComments([...comments, newComment]);
  };

  return (
    <div className="PostDetails">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            {curentPost?.body}
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => comments.length && setCommentsVisible(!commentsVisible)}
            >
              {commentsVisible ? 'Hide' : 'Show'}
              {` ${comments.length} `}
              comments
            </button>
            <ul className="PostDetails__list">

              {commentsVisible && (
                comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))
              )}
            </ul>

          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm addComment={addNewComment} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
