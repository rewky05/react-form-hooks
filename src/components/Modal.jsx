const Modal = ({
  message,
  onCancel,
  onSubmit,
  buttonText,
  hideCancelButton,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-[2px]">
      <div className="bg-white flex flex-col justify-center text-center rounded-md shadow-lg px-4 py-5 w-[350px]">
        <div className="flex justify-center">
          <p className="flex justify-center font-bold text-darkgray pb-4 px-8 w-[360px]">
            {message}
          </p>
        </div>
        <div className="flex items-center justify-evenly">
          {!hideCancelButton && (
            <button onClick={onCancel} className="py-2 px-6 font-[500] shadow-xl outline-none rounded-md bg-red-600 text-white">
              {buttonText}
            </button>
          )}
          <button onClick={onSubmit} className="py-2 px-6 font-[500] shadow-xl outline-none rounded-md bg-green-600 text-white">
            {hideCancelButton ? "Okay" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
