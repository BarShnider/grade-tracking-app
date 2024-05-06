import { useEffect, useState } from "react";
import Button from "./Button";
import {useNavigate } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";
import {toast} from "react-hot-toast";
import EditUniversitiesModal from "./EditUniversitiesModal";
import EditFacultyModal from "./EditFacultyModal";
import EditDegreeModal from "./EditDegreeModal";

function AddCourseForm() {
  //OBJECTS STATES
  const {setNewCourse, universities,setUniversities,connectedUser,loadingUser, BASE_URL,notifyFail } = useUniversities();
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [degrees, setDegrees] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  //ERROR HANDLING
  const [courseNameError, setCourseNameError] = useState("");
  const [courseCodeError, setCourseCodeError] = useState("");
  const [lecturerNameError, setLecturerNameError] = useState("");
  const [universityError, setUniversityError] = useState("");
  const [facultyError, setFacultyError] = useState("");
  const [degreeError, setDegreeError] = useState("");
  //MODAL HANDLING
  const [isUniversitiesModalOpen, setIsUniversitiesModalOpen] = useState(false);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
  const navigate = useNavigate();

  const notify = () => toast.error("נא מלאו את השדות החסרים");
  const notifyCourseSuccess = () => toast.success("הקורס נוסף בהצלחה!");
  const notifySuccess = (text) => toast.success(text);

  useEffect(() => {
    if (!connectedUser && !loadingUser) {
      navigate('/login');
    }
  }, [connectedUser, navigate,loadingUser]);


  function handleAddCourse(e) {
    e.preventDefault();

    let isValid = true;

    if (!courseName) {
      setCourseNameError("שם הקורס נדרש");
      isValid = false;
    } else {
      setCourseNameError("");
    }

    if (!courseCode) {
      setCourseCodeError("מספר קורס נדרש");
      isValid = false;
    } else {
      setCourseCodeError("");
    }

    if (!lecturerName) {
      setLecturerNameError("שם המרצה נדרש");
      isValid = false;
    } else {
      setLecturerNameError("");
    }

    if (!selectedUniversity) {
      setUniversityError("נא לבחור מוסד לימוד");
      isValid = false;
    } else {
      setUniversityError("");
    }

    if (!selectedFaculty) {
      setFacultyError("נא לבחור פקולטה");
      isValid = false;
    } else {
      setFacultyError("");
    }

    if (!selectedDegree) {
      setDegreeError("נא לבחור תואר");
      isValid = false;
    } else {
      setDegreeError("");
    }
    if(isValid){    
      const newAddedCourse = {
        courseName,
         courseCode,
         lecturerName,
        selectedDegree,
         isMandatory
      };
    console.log(newAddedCourse)

    if (
      courseName !== "" &&
      courseCode !== "" &&
      lecturerName !== "" &&
      selectedUniversity !== "" &&
      selectedFaculty !== "" &&
      selectedDegree !== ""
    ) {
      // setNewCourse(newAddedCourse);
      addCourse(selectedDegree,newAddedCourse)
      notifyCourseSuccess()
      // navigate(`/search/sq-${newAddedCourse.courseName}`)
      navigate("/universities")
    } else {
      notify();
    }

  }
  }

  useEffect(
    function () {
      const newAddedCourse = {
        courseName,
        courseCode: Number(courseCode),
        lecturerName,
        university: universities.filter(
          (univ) => Number(univ.universityId) === Number(selectedUniversity)
        ),
        faculty: faculties.filter(
          (fac) => Number(fac.facultyId) === Number(selectedFaculty)
        ),
        degree: degrees.filter(
          (deg) => Number(deg.degreeId) === Number(selectedDegree)
        ),
      };
      // console.log(newAddedCourse)
      // console.log()
      setNewCourse(newAddedCourse);
    },
    [
      courseName,
      courseCode,
      lecturerName,
      selectedUniversity,
      selectedFaculty,
      selectedDegree,
    ]
  );

  async function getFacultiesByUniversityId(id) {
    try {
      const res = await fetch(
        `${BASE_URL}/Faculties/GetFacultiesByUniversityId/${id}`
      );
      const data = await res.json();
      setFaculties(data);
    } catch {
      notifyFail("there was an error loading data..");
    } finally {
      console.log("success");
    }
  }

  async function getDegreesByFaculty(id) {
    try {
      const res = await fetch(
        `${BASE_URL}/Degrees/GetAllDegreesByFacultyId/${id}`
      );
      const data = await res.json();
      setDegrees(data);
    } catch {
      notifyFail("there was an error loading data..");
    } finally {
      console.log("success");
    }
  }

  const addCourse = async (degreeId, newCourse) => {


    // Ensure degreeId is provided
    if (!degreeId) {
      notifyFail('Degree ID is missing');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/Courses/AddNewCourse/${degreeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCourse),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Course added successfully', result);
            // setCourses(prev => [...prev, result]); // Assume setCourses is the state updater for the list of courses
            // handleClose(); // Close modal or any other UI component
        } else {
            throw new Error('Failed to add course');
        }
    } catch (error) {
        console.error('Error adding course:', error);
        notifyFail('Failed to add course');
    }
};

  useEffect(function(){
console.log("universities:", universities)
console.log("faculties:", faculties)
console.log("degrees:", degrees)
  },[universities,faculties,degrees])

  useEffect(
    function () {
      if (selectedUniversity)
        // console.log(selectedUniversity)
        getFacultiesByUniversityId(selectedUniversity);
    },
    [selectedUniversity]
  );
  useEffect(
    function () {
      if (selectedFaculty)
        // console.log(selectedUniversity)
        getDegreesByFaculty(selectedFaculty);
    },
    [selectedFaculty]
  );

  const openUniversitiesModal = (e) => {
    e.preventDefault()
    setIsUniversitiesModalOpen(true);
  };
  const openFacultyModal = (e) => {
    e.preventDefault()
    setIsFacultyModalOpen(true);
  };
  const openDegreeModal = (e) => {
    e.preventDefault()
    setIsDegreeModalOpen(true);
  };
  return (
    <form className="add-form">
      <div className="add-form-item">
        <label htmlFor="course-name">שם קורס:</label>
        <div className="input-container">
          <input
            type="text"
            id="course-name"
            name="courseName"
            onChange={(e) => setCourseName(e.target.value)}
            className="course-name"
            placeholder="לדוג': מבוא למדעי המחשב"
          />
          {courseNameError && (
            <div className="error-message">{courseNameError}</div>
          )}
        </div>
      </div>

      <div className="add-form-item">
        <label htmlFor="course-name">מספר קורס:</label>
        <div className="input-container">
          <input
            className="course-name"
            type="text"
            onChange={(e) => setCourseCode(e.target.value)}
          />
          {courseCodeError && (
            <div className="error-message">{courseCodeError}</div>
          )}
        </div>
      </div>
      <div className="add-form-item">
        <label htmlFor="course-name">שם המרצה:</label>
        <div className="input-container">
          <input
            className="course-name"
            type="text"
            onChange={(e) => setLecturerName(e.target.value)}
          />
          {lecturerNameError && (
            <div className="error-message">{lecturerNameError}</div>
          )}
        </div>
      </div>
      <div className="add-form-item">
        <label htmlFor="course-name">מוסד לימוד:</label>
        <div className="input-container">
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="course-name"
          >
            <option disabled value="">
              בחר מוסד לימוד
            </option>
            {universities.map((uni) => (
              <option key={uni.universityId} value={uni.universityId}>
                {uni.name}
              </option>
            ))}
          </select>
          <button onClick={(e) => openUniversitiesModal(e)} className="add-btn">הוסף </button>
          {universityError && (
            <div className="error-message">{universityError}</div>
          )}
        </div>
      </div>
      <div className="add-form-item">
        <label htmlFor="course-name">פקולטה:</label>
        <div className="input-container">
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="course-name"
            name=""
            id=""
          >
            <option disabled value="">
              בחר פקולטה
            </option>
            {faculties.map((fac) => (
              <option key={fac.facultyId} value={fac.facultyId}>
                {fac.name}
              </option>
            ))}
          </select>
          {selectedUniversity && <button onClick={(e) => openFacultyModal(e)} className="add-btn">הוסף </button>}
          {facultyError && <div className="error-message">{facultyError}</div>}
        </div>
      </div>
      <div className="add-form-item">
        <label htmlFor="course-name">תואר:</label>
        <div className="input-container">
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="course-name"
            name=""
            id=""
          >
            <option disabled value="">
              בחר תואר
            </option>
            {degrees.map((deg) => (
              <option key={deg.degreeId} value={deg.degreeId}>
                {deg.name}
              </option>
            ))}
          </select>
          {selectedFaculty && <button onClick={(e) => openDegreeModal(e)} className="add-btn">הוסף </button>}
          {degreeError && <div className="error-message">{degreeError}</div>}
        </div>
      </div>
      {/* <div className="add-form-item"> */}
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <label htmlFor="course-name">קורס חובה:</label>
        <input
          type="checkbox"
          value={isMandatory}
          onChange={() => setIsMandatory((mandatory) => !mandatory)}
          name=""
          id=""
        />
      </div>

      {/* </div> */}
      <div className="back-next-container">
        {/* <Button>חזור</Button> */}
        <Button onClick={handleAddCourse}>הוסף</Button>
      </div>
      {isUniversitiesModalOpen && (
        <EditUniversitiesModal
          setUniversities={setUniversities}
          isOpen={isUniversitiesModalOpen}
          setIsUniversitiesModalOpen={setIsUniversitiesModalOpen}
          onClose={() => setIsUniversitiesModalOpen(false)}
          isAddNew={true}
          notifySuccess={notifySuccess}     
        />
      )}
      {isFacultyModalOpen && (
        <EditFacultyModal
          selectedUniversity={selectedUniversity}
          setFaculties={setFaculties}
          isOpen={isFacultyModalOpen}
          setIsFacultyModalOpen={setIsFacultyModalOpen}
          onClose={() => setIsFacultyModalOpen(false)}
          isAddNew={true}
          notifySuccess={notifySuccess}     

        />
      )}
      {isDegreeModalOpen && (
        <EditDegreeModal
          selectedFaculty={selectedFaculty}
          setDegrees={setDegrees}
          isOpen={isDegreeModalOpen}
          setIsDegreeModalOpen={setIsDegreeModalOpen}
          onClose={() => setIsDegreeModalOpen(false)}
          isAddNew={true}     
          notifySuccess={notifySuccess}     
        />
      )}
    </form>
  );
}

export default AddCourseForm;
