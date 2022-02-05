import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { deletePostComment, getPostComments, postNewComment } from '../../api/comments';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>({} as Post);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [hideComments, setHideComments] = useState(false);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [postFromServer, commentsFromServer] = await Promise.all([
        getPostDetails(postId),
        getPostComments(postId),
      ]);

      setPost(postFromServer[0]);
      setComments(commentsFromServer);
    };

    fetchData();
  }, [postId]);

  const deleteComment = async (commentId: number) => {
    await deletePostComment(commentId);

    setComments(currentComments => currentComments.filter(
      comment => comment.id !== commentId,
    ));
  };

  const addComment = async (comment: PostComment) => {
    const newComment = await postNewComment(comment);

    setComments(currentComments => [...currentComments, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {post !== null && <p>{post.body}</p>}
      </section>

      <section className="PostDetails__comments">
        {!hideComments ? (
          <button
            type="button"
            className="button PostDetails__button"
            onClick={() => {
              setHideComments(true);
              setShowComments(false);
            }}
            disabled={comments.length < 1}
          >
            Hide comments
          </button>
        ) : (
          <button
            type="button"
            className="button PostDetails__button"
            onClick={() => {
              setShowComments(true);
              setHideComments(false);
            }}
          >
            Show comments
          </button>
        )}

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
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
          <NewCommentForm
            postId={postId}
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};
