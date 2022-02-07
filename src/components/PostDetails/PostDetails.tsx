import React, { useEffect, useState } from 'react';
import { getComments, removeComment } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isHideComment, setHideComment] = useState(true);
  const [comments, setComments] = useState<CommentPost[]>([]);

  const loadComments = async (id: number) => {
    const commentsFromServer = await getComments(id);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    if (post) {
      loadComments(post.id);
    }
  },
  [post]);

  const deleteCommentHendler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await removeComment(+event.currentTarget.value);
    if (post) {
      loadComments(post.id);
    }
  };

  const hideCommentHendler = () => {
    setHideComment((isHide) => (!isHide));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {
        post
          ? (
            <>
              <section className="PostDetails__post">
                <p>
                  {post.title}
                </p>
              </section>

              <section className="PostDetails__comments">
                <button
                  type="button"
                  className="button"
                  onClick={hideCommentHendler}
                >
                  {
                    isHideComment
                      ? (<>Hide </>)
                      : (<>Show </>)
                  }
                  {comments.length}
                  <> comments</>
                </button>
                {
                  isHideComment
                  && (
                    <ul className="PostDetails__list">
                      {
                        comments.map(comment => (
                          <li
                            className="PostDetails__list-item"
                            key={comment.id}
                          >
                            <button
                              type="button"
                              className="PostDetails__remove-button button"
                              value={comment.id}
                              onClick={deleteCommentHendler}
                            >
                              X
                            </button>
                            <p>
                              {comment.body}
                            </p>
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </section>

              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm
                    postId={post.id}
                    updateComments={loadComments}
                  />
                </div>
              </section>
            </>
          )
          : (
            <span>
              Can not find post details
            </span>
          )
      }
    </div>
  );
};
