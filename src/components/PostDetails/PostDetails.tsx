import { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { deleteComments, getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Posts>();
  const [comments, setComments] = useState<Comments[]>();
  const [clickButton, setClickButton] = useState(false);

  const requestForComments = () => (
    getPostComments(selectedPostId)
      .then(commentFormServer => setComments(commentFormServer))
  );

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postFromServer => setPost(postFromServer));

    requestForComments();
  }, [selectedPostId]);

  const deleteCom = async (i: number) => {
    await deleteComments(i);
    requestForComments();
  };

  return (
    <>
      {post && comments
        && (
          <div
            data-cy="postDetails"
            className="PostDetails"
          >
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post.title}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => (
                  setClickButton(!clickButton)
                )}
              >
                {
                  clickButton
                    ? 'Show comments'
                    : 'Hide comments'
                }
              </button>

              {!clickButton
                && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li
                        key={comment.id}
                        className="PostDetails__list-item"
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => {
                            deleteCom(comment.id);
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
                  selectedPostId={selectedPostId}
                  requestForComments={requestForComments}
                />
              </div>
            </section>
          </div>
        )}
    </>
  );
};
