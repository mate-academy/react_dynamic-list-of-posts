import React, { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { getComments, deleteComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  postId: number
};

export const PostDetails: React.FC<Props> = (props) => {
  const { postId } = props;
  const [postDetails, setPostDetails] = useState<Post>({
    id: 0,
    createdAt: '',
    updatedAt: '',
    userId: 0,
    title: '',
    body: '',
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [hidden, setHidden] = useState(false);
  const currentPostDetails = async () => {
    setPostDetails(await getPostDetails(postId));
  };

  const currentComments = async (currentPostId: number) => {
    setComments(await getComments(currentPostId));
  };

  useEffect(() => {
    currentPostDetails();
    currentComments(postId);
  }, [postId]);

  const handleRemoveComment = async (comment: Comment) => {
    await deleteComment(comment.id);
    currentComments(postId);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {!!postId && (
        <>
          <section className="PostDetails__post">
            <p>{postDetails.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setHidden(!hidden)}
            >
              {!hidden ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>

            {!hidden && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleRemoveComment(comment)}
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
                updateComments={currentComments}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
