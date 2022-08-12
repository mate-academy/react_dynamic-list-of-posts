import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader/Loader';
import './PostDetails.scss';

type PostProps = {
  postId: number,
};

export const PostDetails: React.FC <PostProps> = ({ postId }) => {
  const [postContent, setPostContent] = useState('');

  const [areCommentsVisible, setAreCommentsVisible] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);

  const [isPostDetailsLoading, setIsPostDetailsLoading] = useState(true);

  const formWrapperStylesClass = classNames({
    'PostDetails__form-wrapper': true,
    Hidden: postId < 1,
  });

  const reloadComments = async () => {
    const postCommentsFS = await getPostComments(postId);

    setComments(postCommentsFS);
  };

  const toggleCommentsVisibility = () => {
    setAreCommentsVisible(prevState => !prevState);
  };

  const addNewComment = async (
    event: React.FormEvent<HTMLFormElement>,
    currentPostId: number,
    commentUserName: string,
    commentEmail: string,
    commentText: string,
  ) => {
    event.preventDefault();

    await addComment(currentPostId, commentUserName, commentEmail, commentText);
    reloadComments();
  };

  const removeComment = async (commentId: number) => {
    await deleteComment(commentId);
    reloadComments();
  };

  const getPostContent = async () => {
    const detailsOfSelectedPost = await getPostDetails(postId);

    setPostContent(detailsOfSelectedPost.body);
    setIsPostDetailsLoading(false);
  };

  useEffect(() => {
    setIsPostDetailsLoading(true);
    getPostContent();
    reloadComments();
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {
        isPostDetailsLoading
          ? <Loader />
          : (
            <section className="PostDetails__post">
              <p>
                {postContent}
              </p>
            </section>
          )
      }

      <section className="PostDetails__comments">
        {
          (comments.length > 0)
          && (
            <button
              type="button"
              className="button"
              onClick={toggleCommentsVisibility}
            >
              {
                areCommentsVisible
                  ? ` Hide ${comments.length} comments`
                  : ` Show ${comments.length} comments`
              }
            </button>
          )
        }

        {
          areCommentsVisible
            && (
              <ul className="PostDetails__list">
                {
                  comments.map(comment => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          removeComment(comment.id);
                        }}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))
                }
              </ul>
            )
        }

      </section>

      <section>
        <div
          className={formWrapperStylesClass}
        >
          <NewCommentForm
            currentPostId={postId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
