const ExamResult = () => {
  return (
    <div className="container mx-auto bg-white">
      <div className="bg-green-700 flex justify-center items-center">
        <h1 className="text-white text-xl py-4 ">Total Point</h1>
      </div>
      <div className="flex justify-center gap-10 my-4 ">
        <h2 className="text-2xl font-semibold ">Correct Answer : 10</h2>
        <h2 className="text-2xl font-semibold ">Result: 22.5</h2>
      </div>
      <div className="flex justify-center gap-10 my-4">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium px-8 py-3 "
        >
          Review
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800  font-medium  px-8 py-3"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default ExamResult;
