/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteCommentFromServer, addCommentToServer } from '../../api/comments';
import { Post, Comment } from '../../types/types';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [change, setChange] = useState(false);
  const [isCommentsHiden, setIsCommentsHiden] = useState(false);

  async function deleteComment(commentId: number) {
    await deleteCommentFromServer(commentId);
    setChange((change) => !change);
  }

  async function addComment(name: string, email: string, body: string): Promise<void> {
    if (post) {
      const request = {
        postId: post.id,
        name,
        email,
        body,
      };

      const a = await addCommentToServer(request);

      // eslint-disable-next-line no-console
      console.log(a);
      setChange((change) => !change);
    }
  }

  useEffect(() => {
    (async function loadinsComments() {
      if (post) {
        const tempComments = await getPostComments(post.id);

        if (tempComments) {
          setComments(tempComments);
        }
      }

      // eslint-disable-next-line no-console
      console.log(comments);
    }());
  }, [post, change]);

  return post && (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {!!comments.length && (
          <button
            type="button"
            className={classNames(
              'button',
              { 'button--active': isCommentsHiden },
            )}
            onClick={() => setIsCommentsHiden(condition => !condition)}
          >
            {isCommentsHiden ? 'Show' : `Hide ${comments.length} comments`}
          </button>
        )}

        <ul
          className={classNames(
            'PostDetails__list',
            { 'PostDetails__list--hidden': isCommentsHiden },
          )}
        >
          {comments.map(comment => {
            return (
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onAdd={addComment}
          />
        </div>
      </section>
    </div>
  );
};
