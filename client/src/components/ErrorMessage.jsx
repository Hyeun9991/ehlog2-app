const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full mx-auto max-x-md">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
