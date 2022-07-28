import React, { useCallback, useEffect, useState } from 'react';
import { deletePostComment, getCommentsByPostId } from '../../api/comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import Comment from '../types/Comment';
import { getPostById } from '../../api/post';
import Post from '../types/Post';

interface Props {
  postId: number;
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [errorWithComments, setErrorWithComments] = useState(false);
  const [isCommentVisible, setCommentVisibility] = useState(true);

  useEffect(() => {
    const getCommentsServer = async () => {
      try {
        const commentFromServer = await getCommentsByPostId(postId);
        const postFromServer = await getPostById(postId);

        setComments(commentFromServer);
        setPost(postFromServer);
      } catch {
        setErrorWithComments(true);
      }
    };

    getCommentsServer();
  }, [postId]);

  const onDeletindComment = useCallback(async (id) => {
    await deletePostComment(id);

    const filteredComments = [...comments].filter(
      comment => comment.id !== id,
    );

    await setComments(filteredComments);
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentVisibility(!isCommentVisible)}
        >
          {isCommentVisible ? ('Hide comments') : ('Show comments')}
        </button>
        {errorWithComments && <p>Failed to Load Comments</p>}
        {isCommentVisible
            && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => onDeletindComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.name}</p>
                  </li>
                ))}
              </ul>
            )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};
