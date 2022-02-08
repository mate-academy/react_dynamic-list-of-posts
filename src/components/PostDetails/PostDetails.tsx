import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getComments } from '../../api/comments';
import { getPostById } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<PostComment[] | null>(null);
  const [isHiden, setIsHiden] = useState<boolean>(false);

  const loadPost = async (id: number) => {
    const postFromServer = await getPostById(id);

    setPost(postFromServer);
  };

  const loadComments = async (postIdForComments: number) => {
    const postCommentsFromServer = await getComments(postIdForComments);

    setPostComments(postCommentsFromServer);
  };

  const handleHideComments = () => {
    setIsHiden(!isHiden);
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
    await loadComments(postId);
  };

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    await addComment(
      postId,
      name,
      email,
      body,
    );

    await loadComments(postId);
  };

  useEffect(() => {
    loadPost(postId);
    loadComments(postId);
  }, [postId]);

  return (
    post && (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{post.title}</p>
        </section>

        <section className="PostDetails__comments">

          {postComments && postComments.length > 0 && (
            <button
              type="button"
              className="button PostDetails__button-hide"
              onClick={handleHideComments}
            >
              {isHiden ? (
                <>
                  Show comments
                </>
              ) : (
                <>
                  {`Hide ${postComments.length} comments`}
                </>
              )}
            </button>
          )}

          {!isHiden && (
            postComments && postComments.length > 0 ? (
              <ul className="PostDetails__list">
                {postComments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>

            ) : (
              <p>No comments</p>
            )
          )}

        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              onAdd={handleAddComment}
            />
          </div>
        </section>
      </div>
    )
  );
};
