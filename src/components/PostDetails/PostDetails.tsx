import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsIsHidden, setCommentsIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadPost = async () => {
    const postFromServer = await getPostDetails(postId);

    setPost(postFromServer);
  };

  const loadComments = async () => {
    const postComments = await getPostComments(postId);

    setComments(postComments);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await loadPost();
      await loadComments();
      setIsLoading(false);
    })();

    return () => {
      setCommentsIsHidden(true);
    };
  }, [postId]);

  const handleToggleComments = () => {
    setCommentsIsHidden(current => !current);
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
    loadComments();
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      {!!post && (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{post.body}</p>
          </section>

          <section className="PostDetails__comments">
            {comments.length
              ? (
                <button
                  type="button"
                  className="button"
                  onClick={handleToggleComments}
                >
                  {`${commentsIsHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
                </button>
              ) : (
                <p>No comments</p>
              )}

            {!commentsIsHidden && (
              <ul className="PostDetails__list">
                {
                  comments.map(comment => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))
                }
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm postId={postId} loadComments={loadComments} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
