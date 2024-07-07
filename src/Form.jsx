import { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, set, onValue, off } from "firebase/database";
import Modal from "./components/Modal";

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
      `You've successfully submitted your rating for ${employee ? employee.name : ''}.`
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
      await set(ref(database, `Employees/${selectedEmployee.id}`), employeeData);
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
    <div className="p-16">
      <div className="flex justify-end">
        <span className="p-1">Icon</span>
        <h3 className="p-1">QR Manager</h3>
      </div>
      <form onSubmit={checkData}>
        <div className="flex flex-col">
          <h1 className="text-center">PERFORMANCE APPRAISAL</h1>
          <div className="flex justify-evenly p-4">
            <div className="flex">
              <h3>Employee: </h3>
              <select
                value={selectedEmployee.id || ""}
                onChange={handleEmployeeSelect}
                required
              >
                <option value="">Select</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <h3>Position: </h3>
              <input
                type="text"
                value={position}
                readOnly
                required
                className="outline-none px-1"
              />
            </div>
            <div className="flex">
              <h3>Department: </h3>
              <input
                type="text"
                value={department}
                readOnly
                required
                className="outline-none px-1"
              />
            </div>
          </div>
          <div className="flex justify-evenly p-4">
            <div className="w-1/3"></div>
            <div className="w-2/3 flex justify-evenly">
              <span className="ml-14">Poor</span>
              <span className="ml-6">Satisfactory</span>
              <span className="mr-10">Excellent</span>
            </div>
          </div>
          {criteriaList.map((criteria) => (
            <div key={criteria.name} className="p-4">
              <h2 className="font-bold py-2">{criteria.name}</h2>
              <div className="flex flex-wrap">
                {criteria.criterias.map((paragraph, index) => (
                  <div key={index} className="mb-2 w-full flex items-center">
                    <p className="w-1/3">{paragraph}</p>
                    <div className="flex w-2/3 justify-evenly">
                      <input
                        type="radio"
                        id={`${criteria.name}-poor-${index}`}
                        name={`${criteria.name}-${index}`}
                        value="1"
                        required
                        onChange={() => handleRadioChange(criteria.name, index, 1)}
                        checked={radioSelections[`${criteria.name}-${index}`] === 1}
                      />
                      <input
                        type="radio"
                        id={`${criteria.name}-satisfactory-${index}`}
                        name={`${criteria.name}-${index}`}
                        value="3"
                        onChange={() => handleRadioChange(criteria.name, index, 3)}
                        checked={radioSelections[`${criteria.name}-${index}`] === 3}
                      />
                      <input
                        type="radio"
                        id={`${criteria.name}-excellent-${index}`}
                        name={`${criteria.name}-${index}`}
                        value="5"
                        onChange={() => handleRadioChange(criteria.name, index, 5)}
                        checked={radioSelections[`${criteria.name}-${index}`] === 5}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <textarea
              className="p-3 my-2 border outline-none rounded-md flex w-full"
              rows={6}
              placeholder="Suggestions"
              name="suggestions"
              value={suggestions}
              onChange={handleSuggestionsChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="p-1 px-4 my-2 border outline-none rounded-md">
              Finish
            </button>
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
