import React, { useEffect, useState } from 'react';
import { deletePostComments, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [hideComments, setHideComments] = useState(false);

  const deleteComment = async (id: number) => {
    await deletePostComments(id);
  };

  const getComments = async (postId: number) => {
    try {
      const commentsFromS = await getPostComments(postId);

      setComments(commentsFromS);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, 'Request failed');
    }
  };

  const updateComments = async (id: number, postId: number) => {
    await deleteComment(id);
    await getComments(postId);
  };

  useEffect(() => {
    getComments(post.id);
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">

        <button
          type="button"
          className="button button--pb"
          onClick={() => {
            if (comments?.length !== 0) {
              setHideComments(!hideComments);
            }
          }}
        >
          {`${hideComments ? 'Show' : 'Hide'} ${comments?.length} comments`}
        </button>

        {!hideComments && (
          <ul
            className="PostDetails__list"
            data-cy="postDetails"
          >
            {comments?.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    updateComments(comment.id, post.id);
                  }}
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
            postId={post.id}
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
};
