const FeedbackMessage = ({ feedback }) => {
  const { message, error } = feedback;

  if (message === null) return null;

  return (
    <div className={error ? "error" : "success"}>
      <p className={error ? "onError" : "onSuccess"}>{message}</p>
    </div>
  );
};

export default FeedbackMessage;
