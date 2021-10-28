import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { addComment, getPostComments, removeCommentById } from '../../api/comments';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postFromServer => {
        setPost(postFromServer);
      });
    getPostComments()
      .then(commentsFromServer => {
        const filteredComments = commentsFromServer
          .filter(comment => comment.postId === selectedPostId);

        setComments(filteredComments);
      });
  }, [selectedPostId]);

  const addNewComment = (newComment: Partial<Comment>) => {
    addComment(newComment)
      .then(addedComment => {
        setComments(prev => [...prev, addedComment]);
      });
  };

  return (
    <div className="PostDetails">
      {selectedPostId !== 0
        ? (
          <>
            <h2>Post details:</h2>
            <section className="PostDetails__post">
              <p>{post?.body}</p>
            </section>

            {comments.length > 0 && (
              <section className="PostDetails__comments">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setOpened(!isOpened);
                  }}
                >
                  {isOpened ? 'Hide' : 'Show'}
                  &nbsp;
                  {comments.length}
                  &nbsp;
                  comments
                </button>

                {isOpened && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li className="PostDetails__list-item" key={comment.id}>
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => {
                            removeCommentById(comment.id);
                            setComments(prevState => prevState
                              .filter(prevComment => prevComment.id !== comment.id));
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
            )}

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  addNewComment={addNewComment}
                  postId={selectedPostId}
                />
              </div>
            </section>
          </>
        )
        : (
          <h2>Post is not selected</h2>
        )}
    </div>
  );
};
