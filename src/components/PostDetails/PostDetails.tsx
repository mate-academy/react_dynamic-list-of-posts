import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { addPostComment, deletePostComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>({} as Post);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [newPost, newComments] = await Promise.all([
        getPostDetails(postId),
        getPostComments(postId),
      ]);

      setPost(newPost);
      setComments(newComments);

      setIsLoading(false);
    })();
  }, [postId]);

  const handleCommentDelete = (commentId: number) => {
    deletePostComment(commentId);

    setComments(current => current.filter(({ id }) => commentId !== id));
  };

  const handleCommentAdd = async (comment: Partial<PostComment>) => {
    const newComment = await addPostComment(comment);

    setComments(current => [...current, newComment]);
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <>
            <button
              type="button"
              className={classNames(
                'button',
                {
                  'button--active': isHidden,
                },
              )}
              onClick={() => setIsHidden(current => !current)}
            >
              {`${isHidden ? 'Show' : 'Hide'}
              ${comments.length} comments`}
            </button>

            <ul className="PostDetails__list">
              {!isHidden && comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    onClick={() => handleCommentDelete(comment.id)}
                    type="button"
                    className="PostDetails__remove-button button"
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p style={{
            textAlign: 'center',
            marginBottom: 10,
          }}
          >
            There is no comments 🤷‍♀️
          </p>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onCommentAdd={handleCommentAdd}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
