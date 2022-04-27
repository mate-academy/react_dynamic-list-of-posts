import React, { useEffect, useState } from 'react';
import './PostDetails.scss';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { removePostComment, getPostComments } from '../../api/comments';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setHidden] = useState(true);

  const fetchComments = async () => {
    const postCommentsFromServer = await getPostComments(postId);

    setPostComments(postCommentsFromServer);
    setIsLoading(false);
  };

  const fetchPostDetails = async () => {
    setIsLoading(true);
    setPostDetails(await getPostDetails(postId));
    fetchComments();
  };

  useEffect(() => {
    if (postId !== 0) {
      fetchPostDetails();
    }
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isLoading
        ? <Loader />
        : (
          <>
            <section className="PostDetails__post">
              <p>{postDetails?.title}</p>
            </section>

            <section className="PostDetails__comments">
              {postComments.length === 0
                ? <p>No comments</p>
                : (
                  <>
                    <button
                      type="button"
                      className="button"
                      onClick={() => setHidden(!isHidden)}
                    >
                      {`${isHidden ? 'Hide' : 'Show'} ${postComments.length} comments`}
                    </button>

                    {isHidden && (
                      <ul className="PostDetails__list">
                        {postComments.map(comment => (
                          <li
                            className="PostDetails__list-item"
                            key={comment.id}
                          >
                            <button
                              type="button"
                              className="PostDetails__remove-button button"
                              onClick={() => {
                                removePostComment(comment.id);
                                setPostComments(postComments
                                  .filter(c => c.id !== comment.id));
                              }}
                            >
                              X
                            </button>
                            <p>{comment.body}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  postId={postId}
                  fetchComments={fetchComments}
                />
              </div>
            </section>
          </>
        )}
    </div>
  );
};
