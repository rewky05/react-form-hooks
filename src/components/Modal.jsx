const Modal = ({
  message,
  onCancel,
  onSubmit,
  buttonText,
  hideCancelButton,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white flex flex-col justify-center text-center rounded-md shadow-lg px-4 py-2 w-[300px]">
        <div className="flex justify-center">
          <h1 className="flex justify-center font-bold text-darkgray pb-3 px-2 w-[240px]">
            {message}
          </h1>
        </div>
        <div>
          {!hideCancelButton && (
            <button onClick={onCancel} className="">
              {buttonText}
            </button>
          )}
          <button onClick={onSubmit} className="">
            {hideCancelButton ? "Okay" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
