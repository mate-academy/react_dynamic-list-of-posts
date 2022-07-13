import React, { useEffect, useState } from 'react';
import { getComments, getPost } from '../../api/api';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Comment } from '../../Types/Comment';
import { Post } from '../../Types/Post';

type Props = {
  selectedPost: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    const usersFromServer = async () => {
      setPost(await getPost(selectedPost));
    };

    usersFromServer();
  }, [selectedPost]);

  useEffect(() => {
    const commentsFromServer = async () => {
      setComments(await getComments(selectedPost));
    };

    commentsFromServer();
  }, [selectedPost]);

  const deleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const addComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="PostDetails">
      {post?.id
        ? (
          <>
            <h2>Post details:</h2>

            <section className="PostDetails__post">
              <p>{post.body}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length > 0
                && (
                  <button
                    onClick={() => (hideComments
                      ? setHideComments(false)
                      : setHideComments(true))}
                    type="button"
                    className="button"
                  >
                    {!hideComments ? `Hide ${comments.length} comments` : `Show ${comments.length} comments`}
                  </button>
                )}

              <ul className="PostDetails__list">
                {!hideComments && comments.map(comment => (
                  <li className="PostDetails__list-item">
                    <button
                      onClick={() => deleteComment(comment.id)}
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  addNewComment={addComment}
                  selectedPost={selectedPost}
                />
              </div>
            </section>
          </>
        )
        : <h2>Select post.</h2>}
    </div>
  );
};
