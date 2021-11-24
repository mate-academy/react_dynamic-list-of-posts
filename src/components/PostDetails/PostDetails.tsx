import React, { useEffect, useState } from 'react';
import { deleteComment, getCommentsByPostId } from '../../api/comments';
import { getPostDetailsByPostId } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = React.memo(
  ({ postId }) => {
    const [post, setPost] = useState<Post | null>();
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [isCommentsShown, setIsCommentsShown] = useState(true);

    async function loadPostDetails() {
      const postFromServer: Post = await getPostDetailsByPostId(postId);

      setPost(postFromServer);
    }

    async function loadComments() {
      const commentsFromServer: Comment[] = await getCommentsByPostId(postId);

      setComments(commentsFromServer);
    }

    useEffect(() => {
      loadPostDetails();
      loadComments();
    }, [postId, comments]);

    const handleShowCommentsButton = () => {
      setIsCommentsShown(prevIsCommentsShown => !prevIsCommentsShown);
    };

    return (
      <div className="PostDetails">
        {post ? (
          <>
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>
                {post.title}
              </p>
            </section>

            {comments?.length ? (
              <>
                <section className="PostDetails__comments">
                  <button
                    type="button"
                    className="button"
                    onClick={handleShowCommentsButton}
                  >
                    {isCommentsShown
                      ? `Hide ${comments.length} comments`
                      : `Show ${comments.length} comments`}
                  </button>

                  {isCommentsShown && (
                    <ul className="PostDetails__list">
                      {comments.map(comment => (
                        <li
                          className="PostDetails__list-item"
                          key={comment.id}
                        >
                          <button
                            type="button"
                            className="PostDetails__remove-button button"
                            onClick={() => deleteComment(comment.id)}
                          >
                            X
                          </button>
                          <p>{comment.name}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </>
            ) : (
              <h3>No comments</h3>
            )}

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm postId={postId} />
              </div>
            </section>
          </>
        ) : (<h2>Post not found</h2>)}
      </div>
    );
  },
);
