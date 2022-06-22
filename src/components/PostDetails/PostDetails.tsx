import { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Posts>();
  const [comments, setComments] = useState<Comments[]>();
  const [clickButton, setClickButton] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postFromServer => setPost(postFromServer));

    getPostComments(selectedPostId)
      .then(commentFormServer => setComments(commentFormServer));
  }, [selectedPostId]);

  const filterComments = (commentFilter: Comments) => {
    const result = comments?.filter(
      commentF => commentF.name !== commentFilter.name,
    );

    setComments(result);
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
                          onClick={() => filterComments(comment)}
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
                <NewCommentForm setComment={setComments} />
              </div>
            </section>
          </div>
        )}
    </>
  );
};
