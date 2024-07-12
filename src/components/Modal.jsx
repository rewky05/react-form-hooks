const Modal = ({ message, onCancel, onSubmit, hideSubmitButton }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-[2px]">
      <div className="bg-white flex flex-col justify-center text-center rounded-md shadow-lg px-4 py-5 w-[360px]">
        <div className="flex justify-center">
          <p className="flex justify-center font-bold text-darkgray pb-4 px-8">
            {message}
          </p>
        </div>
        {!hideSubmitButton ? (
          <div className="flex items-center justify-evenly">
            <button
              onClick={onCancel}
              className="py-2 px-6 font-[500] shadow-xl outline-none rounded-md bg-red-600 text-white"
            >
              Cancel
            </button>

            <button
              onClick={onSubmit}
              className="py-2 px-6 font-[500] shadow-xl outline-none rounded-md bg-green-600 text-white"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-evenly">
            <button
              onClick={onCancel}
              className="py-2 px-6 font-[500] shadow-xl outline-none rounded-md bg-green-600 text-white"
            >
              Okay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
