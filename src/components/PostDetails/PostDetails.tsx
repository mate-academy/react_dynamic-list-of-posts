import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { PostData } from '../../types/PostData';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [singlePost, setSinglePost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<null | Comment[]>(null);
  const [show, setShow] = useState<boolean>(true);
  const [commentsNumber, setCommentsNumber]
  = useState<number>(comments ? comments.length : 0);

  useEffect(() => {
    if (selectedPostId < 1) {
      return;
    }

    getPostDetails(selectedPostId)
      .then(res => {
        if (res.responseError.error === null) {
          setSinglePost(res.data);
        } else {
          // eslint-disable-next-line no-console
          console.log(`${res.responseError.message}`);
        }
      });
  }, [selectedPostId]);

  useEffect(() => {
    if (singlePost !== null) {
      getPostComments(singlePost.id)
        .then(res => {
          if (res.responseError.error === null) {
            setComments(res.data);
          } else {
            // eslint-disable-next-line no-console
            console.log(`${res.responseError.message}`);
          }
        });
    }
  }, [singlePost, commentsNumber]);

  return (
    <div className="PostDetails">
      {
        singlePost && (
          <>
            <h2>Post details:</h2>
            <section className="PostDetails__post">
              <p>{singlePost.body}</p>
            </section>

            {
              comments && comments.length > 0 && (
                <>
                  <section className="PostDetails__comments">
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setShow(state => !state);
                      }}
                    >
                      {`${show ? 'Hide' : 'Show'} ${comments.length} comments`}
                    </button>
                    {
                      show && (
                        <ul className="PostDetails__list">
                          {
                            comments.map(el => (
                              <li
                                className="PostDetails__list-item"
                                key={el.id}
                              >
                                <button
                                  type="button"
                                  className="PostDetails__remove-button button"
                                  onClick={() => {
                                    deleteComment(el.id)
                                      .then(res => {
                                        if (res.ok) {
                                          setCommentsNumber(prev => prev - 1);
                                        }
                                      });
                                  }}
                                >
                                  X
                                </button>
                                <p>{el.body}</p>
                              </li>
                            ))
                          }
                        </ul>
                      )
                    }
                  </section>
                </>
              )
            }
            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={singlePost.id}
                  commentsNumber={commentsNumber}
                  setCommentsNumber={setCommentsNumber}
                />
              </div>
            </section>
          </>
        )
      }
    </div>
  );
};
