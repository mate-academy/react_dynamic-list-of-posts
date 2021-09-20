import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const commentsToggle = () => {
    setIsCommentsVisible((isVisible) => !isVisible);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [post, comments] = await Promise.all([
          getPostDetails(selectedPostId),
          getPostComments(selectedPostId),
        ]);

        setError(false);
        setLoading(false);
        setSelectedPost(post);
        setPostComments(comments);
      } catch {
        setLoading(false);
        setError(true);
      }
    })();
  }, [selectedPostId]);

  const addNewComment = async (newComment: Partial<Comment>) => {
    await addComment(newComment);

    const commentsAfterUpdate = await getPostComments(selectedPostId);

    setPostComments(commentsAfterUpdate);
  };

  const removeComment = async (id: number) => {
    await deleteComment(id);

    const commentsAfterDelete = await getPostComments(selectedPostId);

    setPostComments(commentsAfterDelete);
  };

  // eslint-disable-next-line
  return (loading ? (
    <h2>Please wait, loading...</h2>
  ) : (
    <>
      {error && (
        <h3>Ups... Something went wrong</h3>
      )}
      {!error && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{selectedPost?.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={commentsToggle}
            >
              {`${isCommentsVisible ? 'Hide' : 'Show'} ${postComments.length} comments`}
            </button>

            <ul className="PostDetails__list">
              {isCommentsVisible && postComments.map((comment: Comment) => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      removeComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                addComment={addNewComment}
                postId={selectedPostId}
              />
            </div>
          </section>
        </div>
      )}
    </>
  ));
};
