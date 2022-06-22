import React, { useEffect, useState } from 'react';
import { API } from '../../api/api';
import { Comment, Post } from '../../react-app-env';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const deleteComments = (id: number) => {
    API.deleteComments(id);

    setComments(prev => prev.filter(el => el.id !== id));
  };

  const addNewComment = (comment: Partial<Comment>) => {
    API.addComment({ ...comment, postId: selectedPostId })
      .then((data) => setComments([...comments, data]));
  };

  useEffect(() => {
    setIsLoading(true);

    if (selectedPostId !== 0) {
      API.getPostDetails(selectedPostId)
        .then(data => setPost(data));

      API.getPostComments(selectedPostId)
        .then(data => {
          setComments(data);
          setIsLoading(false);
        });
    }
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {!isLoading ? (
        <>
          <section className="PostDetails__post">
            <p>{post?.body}</p>
          </section>

          {Boolean(comments.length) && (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setShowComments((prev) => !prev)}
              >
                {showComments ? 'Hide' : 'Show'}
                {' '}
                {comments?.length}
                {' '}
                comments
              </button>

              <ul className="PostDetails__list">
                {
                  showComments && (
                    comments.map(comment => (
                      <li
                        key={comment.id}
                        className="PostDetails__list-item"
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => deleteComments(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))
                  )
                }
              </ul>
            </section>
          )}
        </>
      ) : (
        <Loader />
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addNewComment}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
