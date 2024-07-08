import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, set, onValue, off } from "firebase/database";
import Modal from "./components/Modal";
import { IoPersonCircle } from "react-icons/io5";

const Form = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [position, setPosition] = useState("N/A");
  const [department, setDepartment] = useState("N/A");

  const [ratings, setRatings] = useState({});
  const [radioSelections, setRadioSelections] = useState({});
  const [suggestions, setSuggestions] = useState("");

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [doneModal, setDoneModal] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const buttonTextCancel = "Cancel";
  const buttonTextOkay = "Okay";
  const confirmationMessage = "Are you sure you want to submit?";

  const criteriaList = [
    {
      name: "Quality of Work",
      criterias: [
        "Attention to detail",
        "Accuracy and thoroughness",
        "Consistency in delivering high-quality work",
      ],
    },
    {
      name: "Communication",
      criterias: [
        "Clarity and effectiveness in communication",
        "Listening skills",
        "Ability to provide constructive feedback",
      ],
    },
    {
      name: "Teamwork",
      criterias: [
        "Collaboration with colleagues",
        "Contribution to team goals",
        "Respect for diverse perspectives",
      ],
    },
    {
      name: "Punctuality and Attendance",
      criterias: [
        "Adherence to work schedules",
        "Timeliness in meeting deadlines",
        "Reliability and dependability",
      ],
    },
    {
      name: "Problem-Solving",
      criterias: [
        "Ability to identify and address issues",
        "Creativity in finding solutions",
        "Initiative in tackling challenges",
      ],
    },
    {
      name: "Professional Development",
      criterias: [
        "Willingness to learn and improve",
        "Participation in training and development activities",
        "Adaptability to new roles and responsibilities",
      ],
    },
  ];

  useEffect(() => {
    const employeeRef = ref(database, "Employees");

    const handleData = (snapshot) => {
      const fetchedEmployees = snapshot.val();
      if (fetchedEmployees) {
        const employeesList = Object.keys(fetchedEmployees)
          .filter((key) => !fetchedEmployees[key].rating)
          .map((key) => ({
            id: key,
            ...fetchedEmployees[key],
          }));
        setEmployees(employeesList);
      } else {
        setEmployees([]);
      }
    };

    onValue(employeeRef, handleData);

    return () => {
      off(employeeRef, handleData);
    };
  }, []);

  const handleEmployeeSelect = (e) => {
    const employeeId = e.target.value;
    const employee = employees.find((emp) => emp.id === employeeId);
    setSelectedEmployee(employee || {});
    setPosition(employee ? employee.position : "");
    setDepartment(employee ? employee.department : "");
    setSuccessfulMessage(
      `You've successfully submitted your rating for ${
        employee ? employee.name : ""
      }.`
    );
  };

  const handleRadioChange = (criteria, index, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [criteria]: {
        ...prevRatings[criteria],
        [`criteria-${index + 1}`]: value,
      },
    }));
    setRadioSelections((prevSelections) => ({
      ...prevSelections,
      [`${criteria}-${index}`]: value,
    }));
  };

  const handleSuggestionsChange = (e) => {
    setSuggestions(e.target.value);
  };

  const checkData = (e) => {
    e.preventDefault();
    if (!selectedEmployee.id) {
      alert("Please select an employee");
      return;
    }
    setConfirmationModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      ...selectedEmployee,
      rating: ratings,
      suggestions: suggestions,
    };

    try {
      await set(
        ref(database, `Employees/${selectedEmployee.id}`),
        employeeData
      );
      setConfirmationModal(false);
      setDoneModal(true);

      setSelectedEmployee({});
      setPosition("");
      setDepartment("");
      setRatings({});
      setRadioSelections({});
      setSuggestions("");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data.");
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 p-8 shadow-xl bg-lightgrey">
        <span></span>
        <div className="">
          <h1 className="text-center p-1 text-2xl text-darkgrey font-[800]">
            PERFORMANCE APPRAISAL
          </h1>
        </div>
        <div className="flex justify-end items-center">
          <span className="p-1">
            <IoPersonCircle size={30} />
          </span>
          <h3 className="p-1 font-semibold">QR Manager</h3>
        </div>
      </div>
      <form className="bg-paleblue m-8 rounded-[2.2rem]" onSubmit={checkData}>
        <div className="flex flex-col">
          <div className="flex justify-evenly pt-8">
            <div className="flex border outline-none bg-lightgrey mx-4 py-2 px-4 rounded-lg shadow-inner text-darkgrey font-semibold">
              <h3>Employee: </h3>
              <select
                className="pl-2 bg-transparent"
                value={selectedEmployee.id || ""}
                onChange={handleEmployeeSelect}
                required
              >
                <option className="font-sans" value="">Select</option>
                {employees.map((employee) => (
                  <option className="appearance-nonefont-sans" key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex border outline-none bg-lightgrey mx-4 py-2 px-4 rounded-lg shadow-inner text-darkgrey font-semibold">
              <h3>Position: </h3>
              <input
                type="text"
                value={position}
                readOnly
                required
                className="outline-none px-1 bg-transparent"
              />
            </div>
            <div className="flex border outline-none bg-lightgrey mx-4 py-2 px-4 rounded-lg shadow-inner text-darkgrey font-semibold">
              <h3>Department: </h3>
              <input
                type="text"
                value={department}
                readOnly
                required
                className="outline-none px-1 bg-transparent"
              />
            </div>
          </div>
          <div className="">
            <div className="bg-lightgrey mx-4 my-8 p-4 rounded-2xl shadow-xl">
              <div className="flex justify-evenly p-4">
                <div className="w-1/3"></div>
                <div className="w-2/3 flex justify-evenly font-semibold text-lg text-darkgrey px-10">
                  <span className="">Poor</span>
                  <span className="ml-2">Satisfactory</span>
                  <span className="">Excellent</span>
                </div>
              </div>
              {criteriaList.map((criteria) => (
                <div key={criteria.name} className="pb-4 border-b mx-6">
                  <p className="font-bold py-4 text-darkgrey text-lg">
                    {criteria.name}
                  </p>
                  <div className="flex flex-wrap">
                    {criteria.criterias.map((paragraph, index) => (
                      <div
                        key={index}
                        className="mb-2 w-full flex items-center"
                      >
                        <p className="w-1/3">{paragraph}</p>
                        <div className="flex w-2/3 justify-evenly">
                          <input
                            className="w-5 h-5 m-2"
                            type="radio"
                            id={`${criteria.name}-poor-${index}`}
                            name={`${criteria.name}-${index}`}
                            value="1"
                            required
                            onChange={() =>
                              handleRadioChange(criteria.name, index, 1)
                            }
                            checked={
                              radioSelections[`${criteria.name}-${index}`] === 1
                            }
                          />
                          <input
                            className="w-5 h-5 m-2"
                            type="radio"
                            id={`${criteria.name}-satisfactory-${index}`}
                            name={`${criteria.name}-${index}`}
                            value="3"
                            onChange={() =>
                              handleRadioChange(criteria.name, index, 3)
                            }
                            checked={
                              radioSelections[`${criteria.name}-${index}`] === 3
                            }
                          />
                          <input
                            className="w-5 h-5 m-2"
                            type="radio"
                            id={`${criteria.name}-excellent-${index}`}
                            name={`${criteria.name}-${index}`}
                            value="5"
                            onChange={() =>
                              handleRadioChange(criteria.name, index, 5)
                            }
                            checked={
                              radioSelections[`${criteria.name}-${index}`] === 5
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <textarea
                className="border outline-none flex w-full bg-lightgrey mx-4 my-4 p-4 rounded-2xl shadow-inner"
                rows={6}
                placeholder="Suggestions"
                name="suggestions"
                value={suggestions}
                onChange={handleSuggestionsChange}
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-6 text-xl font-[500] shadow-xl outline-none rounded-md bg-primaryblue mx-4 mb-4 text-white"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </form>
      {confirmationModal && (
        <Modal
          message={confirmationMessage}
          onCancel={() => setConfirmationModal(false)}
          onSubmit={handleSubmit}
          buttonText={buttonTextCancel}
        />
      )}
      {doneModal && (
        <Modal
          message={successfulMessage}
          onCancel={() => setDoneModal(false)}
          onSubmit={() => setDoneModal(false)}
          buttonText={buttonTextOkay}
          hideCancelButton
        />
      )}
    </div>
  );
};

export default Form;
