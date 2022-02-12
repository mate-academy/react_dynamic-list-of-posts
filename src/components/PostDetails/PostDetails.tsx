import React, { useEffect, useState } from 'react';
import { getComments, removeComment } from '../../api/comments';
import { selectedPostId } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [isHideComment, setHideComment] = useState(true);
  const [comments, setComments] = useState<CommentPost[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoader, setLoader] = useState(false);

  const loadComments = async (id: number) => {
    const commentsFromServer = await getComments(id);

    setComments(commentsFromServer);
  };

  const loadPostDetails = async (id: number) => {
    setLoader(true);
    const postFromServer = await selectedPostId(id);

    setPost(postFromServer);
    setLoader(false);
  };

  useEffect(() => {
    if (postId) {
      loadPostDetails(postId);
    }
  },
  [postId]);

  useEffect(() => {
    if (post) {
      loadComments(postId);
    }
  },
  [post]);

  const hendlerDeleteComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await removeComment(+event.currentTarget.value);
    if (post) {
      loadComments(postId);
    }
  };

  const hendlerHideComment = () => {
    setHideComment((isHide) => (!isHide));
  };

  if (isLoader) {
    return (
      <Loader />
    );
  }

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

              {
                !!comments.length
                && (
                  <section className="PostDetails__comments">
                    <button
                      type="button"
                      className="button"
                      onClick={hendlerHideComment}
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
                                  onClick={hendlerDeleteComment}
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
                )
              }

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
