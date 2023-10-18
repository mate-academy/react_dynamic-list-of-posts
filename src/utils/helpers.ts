export const getWhatToShow = (
  isError: boolean,
  isLoad: boolean,
  isContent: boolean,
) => {
  const isShowLoad = isLoad && !isError && !isContent;
  const isShowError = !isLoad && isError && !isContent;
  const isShowContent = !isLoad && !isError && isContent;
  const isShowNoContent = !isLoad && !isError && !isContent;

  return ({
    isShowLoad,
    isShowError,
    isShowContent,
    isShowNoContent,
  });
};
