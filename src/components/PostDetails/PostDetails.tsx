import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import {
  getPostDetails,
  getPostComments,
  removeComment,
  addComment,
} from '../../api';
import './PostDetails.scss';
import { Loader } from '../Loader';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isCommentsShow, toggleIsCommentsShow] = useState(true);

  const loadPostById = async (postId: number) => {
    try {
      setIsPostLoading(true);
      const postsFromServer = await getPostDetails(postId);

      setPost(postsFromServer);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    loadPostById(selectedPostId);
  }, [selectedPostId]);

  const loadCommentsByPostId = async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadCommentsByPostId(selectedPostId);
  }, [selectedPostId]);

  const handleRemoveCommentById = async (commentId: number, postId: number) => {
    await removeComment(commentId);

    const commentsFromServer = await getPostComments(postId);

    setComments(commentsFromServer);
  };

  const handleAddComment = async (newComment: NewComment) => {
    await addComment(newComment);

    const commentsFromServer = await getPostComments(newComment.postId);

    setComments(commentsFromServer);
  };

  return (
    (
      <div className="PostDetails">
        {isPostLoading ? <Loader />
          : (
            <>
              <h2>
                Post details:
                {' '}
                {post?.title}
              </h2>

              <section className="PostDetails__post">
                <p>{post?.title}</p>
                <p>{post?.body}</p>
              </section>

              <section className="PostDetails__comments">
                {isCommentsShow && comments.length > 0
                  ? (
                    <button
                      onClick={() => toggleIsCommentsShow(false)}
                      type="button"
                      className="button"
                    >
                      {`Hide ${comments.length} comments`}
                    </button>
                  )
                  : (
                    <button
                      onClick={() => toggleIsCommentsShow(true)}
                      type="button"
                      className="button"
                    >
                      {comments.length > 0 ? `Show ${comments.length} comments` : 'No comments'}
                    </button>
                  )}

                { isCommentsShow && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li key={comment.id} className="PostDetails__list-item">
                        <button
                          onClick={() => handleRemoveCommentById(comment.id, comment.postId)}
                          type="button"
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
                  <NewCommentForm onAddComment={handleAddComment} selectedPostId={selectedPostId} />
                </div>
              </section>
            </>
          )}
      </div>
    )
  );
};
