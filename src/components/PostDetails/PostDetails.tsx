import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const updateComments = async () => {
    const newComments = await getPostComments(postId);

    setComments(newComments);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const postPromise = getPostDetails(postId);

      await updateComments();
      const newPost = await postPromise;

      setPost(newPost);
      setLoading(false);
    })();
  }, [postId]);

  const handeDelete = async (commentId: number) => {
    await deleteComment(commentId);
    await updateComments();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p className="PostDetails__title">{post?.title}</p>
      </section>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      {comments.length ? (
        <section className="PostDetails__comments">
          {showComments ? (
            <>
              <button
                type="button"
                className="button"
                onClick={() => setShowComments(false)}
              >
                {`Hide ${comments.length} comment${comments.length > 1 ? 's' : ''}`}
              </button>

              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handeDelete(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(true)}
            >
              {`Show ${comments.length} comment${comments.length > 1 ? 's' : ''}`}
            </button>
          )}
        </section>
      ) : (
        <p className="PostDetails__comments">No comments</p>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} onUpdateComments={updateComments} />
        </div>
      </section>
    </div>
  );
};
