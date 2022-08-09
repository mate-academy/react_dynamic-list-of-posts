import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import * as PostsApi from '../../api/posts';
import * as CommentsApi from '../../api/comments';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const getPostDetails = async (id: number) => {
      const data = await PostsApi.getPostDetails(id);

      setPostDetails(data);
    };

    const getPostComments = async (id: number) => {
      const data = await CommentsApi.getPostComments(id);

      setPostComments(data);
    };

    getPostDetails(selectedPostId);
    getPostComments(selectedPostId);
  }, [selectedPostId]);

  const handleDeleteComment = async (id: number) => {
    await CommentsApi.deletePostComment(id);

    const commentsFromServer = await CommentsApi
      .getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
  };

  const handleAddComment = async (
    name: string,
    email: string,
    title: string,
  ) => {
    await CommentsApi.postNewComment(selectedPostId, name, email, title);

    const commentsFromServer = await CommentsApi
      .getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
  };

  return (
    <>
      {postDetails !== null
        && (
          <div className="PostDetails">
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{postDetails.title}</p>
            </section>

            <section className="PostDetails__comments" data-cy="postDetails">
              <div className="PostDetails__buttons">
                {showButton
                  ? (
                    <button
                      type="button"
                      className="button"
                      onClick={() => setShowButton(false)}
                    >
                      Hide comments
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="button"
                      onClick={() => setShowButton(true)}

                    >
                      Show comments
                    </button>
                  )}
              </div>

              {showButton && (
                <ul data-cy="postDetails" className="PostDetails__list">
                  {postComments.map(comment => (
                    <li
                      data-cy="postDetails"
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        type="button"
                        className="PostDetails__remove-button button"
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
                <NewCommentForm
                  handleAddComment={handleAddComment}
                  selectedPostId={selectedPostId}
                />
              </div>
            </section>
          </div>
        )}
    </>
  );
};
