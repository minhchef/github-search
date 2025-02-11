const SuccessMessage = () => {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">Success!</span> The new issue is created
    </div>
  );
};

export default SuccessMessage;
