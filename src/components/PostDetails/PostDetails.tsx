import React, { useCallback, useEffect, useState } from 'react';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { deletePostComment, getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = React.memo(({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(true);

  // eslint-disable-next-line no-console
  console.log('post details re');

  const fetchComments = useCallback(async () => {
    setComments(await getPostComments(selectedPostId));
    setDetailsLoading(false);
  }, [selectedPostId]);

  const fetchPostDetails = async () => {
    setDetailsLoading(true);
    setPost(await getPostDetails(selectedPostId));
    fetchComments();
  };

  useEffect(() => {
    if (selectedPostId !== 0) {
      fetchPostDetails();
    }
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {detailsLoading
        ? <p>Loading details...</p>
        : (
          <>
            <section className="PostDetails__post">
              <p>{post?.title}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length === 0
                ? <p>No comments</p>
                : (
                  <>
                    <button
                      type="button"
                      className="button"
                      onClick={() => setCommentsVisible(!commentsVisible)}
                    >
                      {`${commentsVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
                    </button>

                    {commentsVisible && (
                      <ul className="PostDetails__list">
                        {comments.map(comment => (
                          <li className="PostDetails__list-item" key={comment.id}>
                            <button
                              type="button"
                              className="PostDetails__remove-button button"
                              onClick={() => {
                                deletePostComment(comment.id);
                                setComments(comments.filter(c => c.id !== comment.id));
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
                <NewCommentForm selectedPostId={selectedPostId} fetchComments={fetchComments} />
              </div>
            </section>
          </>
        )}
    </div>
  );
});
