interface WriteCommentButtonProps {
  setIsCommentFormOpened: (val: boolean) => void;
}
export const WriteCommentButton: React.FC<WriteCommentButtonProps> = ({
  setIsCommentFormOpened,
}) => {
  return (
    <button
      data-cy="WriteCommentButton"
      type="button"
      className="button is-link"
      onClick={() => setIsCommentFormOpened(true)}
    >
      Write a comment
    </button>
  );
};
