import { useEffect, useState } from "react"
import Button from "./Button"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useUniversities } from "../contexts/AppContext"
import toast, { Toaster } from 'react-hot-toast';



function AddCourseForm({handleNewCourse}) {
    const {newCourse, setNewCourse, universities, BASE_URL} = useUniversities()
    const [faculties,setFaculties] = useState([])
    const [selectedFaculty,setSelectedFaculty] = useState("")
    const [courseName,setCourseName] = useState("")
    const [courseCode,setCourseCode] = useState("")
    const [lecturerName,setLecturerName] = useState("")
    const [selectedUniversity,setSelectedUniversity] = useState("");
    const [degrees, setDegrees] = useState([])
    const [selectedDegree, setSelectedDegree] = useState("")
    const [isMandatory, setIsMandatory] = useState(false);

    const [courseNameError, setCourseNameError] = useState('');
const [courseCodeError, setCourseCodeError] = useState('');
const [lecturerNameError, setLecturerNameError] = useState('');
const [universityError, setUniversityError] = useState('');
const [facultyError, setFacultyError] = useState('');
const [degreeError, setDegreeError] = useState('');

const notify = () => toast.error("נא מלאו את השדות החסרים");


    const navigate = useNavigate();

    function handleAddCourse(e){
        
        e.preventDefault()

        let isValid = true;

    if (!courseName) {
        setCourseNameError('שם הקורס נדרש');
        isValid = false;
    } else {
        setCourseNameError('');
    }

    if (!courseCode) {
        setCourseCodeError('מספר קורס נדרש');
        isValid = false;
    } else {
        setCourseCodeError('');
    }

    if (!lecturerName) {
        setLecturerNameError('שם המרצה נדרש');
        isValid = false;
    } else {
        setLecturerNameError('');
    }

    if (!selectedUniversity) {
        setUniversityError('נא לבחור מוסד לימוד');
        isValid = false;
    } else {
        setUniversityError('');
    }

    if (!selectedFaculty) {
        setFacultyError('נא לבחור פקולטה');
        isValid = false;
    } else {
        setFacultyError('');
    }

    if (!selectedDegree) {
        setDegreeError('נא לבחור תואר');
        isValid = false;
    } else {
        setDegreeError('');
    }


        const newAddedCourse = {
            courseName,
            courseCode : Number(courseCode),
            lecturerName,
            university: Number(selectedUniversity),
            faculty: Number(selectedFaculty),
            degree: Number(selectedDegree),

        }

        if( courseName !== "" && courseCode !== "" && lecturerName !== "" && selectedUniversity !== "" && selectedFaculty !== "" && selectedDegree !== ""){
            setNewCourse(newAddedCourse);
            // navigate("/addnew/dest-form")
        }
        else {
            notify()
        }

        console.log(newAddedCourse)
    }

    useEffect(function(){
        const newAddedCourse = {
            courseName,
            courseCode : Number(courseCode),
            lecturerName,
            university: universities.filter(univ => Number(univ.universityId) === Number(selectedUniversity)),
            faculty: faculties.filter(fac => Number(fac.facultyId) === Number(selectedFaculty)),
            degree: degrees.filter(deg => Number(deg.degreeId) === Number(selectedDegree)),

        }
        // console.log(newAddedCourse)
        // console.log()
        setNewCourse(newAddedCourse)
    },[courseName,courseCode,lecturerName,selectedUniversity,selectedFaculty,selectedDegree])

    async function getFacultiesByUniversityId(id) {
        try {
          const res = await fetch(`${BASE_URL}/Faculties/GetFacultiesByUniversityId/${id}`);
          const data = await res.json();
          setFaculties(data);
        } catch {
          alert("there was an error loading data..");
        } finally {
            console.log("success")
        }
      }

      async function getDegreesByFaculty(id) {
        try {
          const res = await fetch(`${BASE_URL}/Degrees/GetAllDegreesByFacultyId/${id}`);
          const data = await res.json();
          setDegrees(data);
        } catch {
          alert("there was an error loading data..");
        } finally {
            console.log("success")
        }
      }

    useEffect(function(){
        if(selectedUniversity)
        // console.log(selectedUniversity)
        getFacultiesByUniversityId(selectedUniversity)
    },[selectedUniversity])
    useEffect(function(){
        if(selectedFaculty)
        // console.log(selectedUniversity)
        getDegreesByFaculty(selectedFaculty)
    },[selectedFaculty])
    return (
            <form className="add-form">
                <div className="add-form-item">
                    <label htmlFor="course-name">שם קורס:</label>
                    <div className="input-container">
                        <input type="text" id="course-name" name="courseName" onChange={(e) => setCourseName(e.target.value)} className="course-name" placeholder="לדוג': מבוא למדעי המחשב" />
                        {courseNameError && <div className="error-message">{courseNameError}</div>}
                    </div>
                </div>

                <div className="add-form-item">
                    <label htmlFor="course-name">מספר קורס:</label>
                    <div className="input-container">
                    <input className="course-name" type="text" onChange={(e) => setCourseCode(e.target.value)} />
                    {courseCodeError && <div className="error-message">{courseCodeError}</div>}
                    </div>

                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">שם המרצה:</label>
                    <div className="input-container">
                    <input className="course-name" type="text" onChange={(e) => setLecturerName(e.target.value)} />
                    {lecturerNameError && <div className="error-message">{lecturerNameError}</div>}
                    </div>
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">מוסד לימוד:</label>
                    <div className="input-container">
                    <select value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)} className="course-name">
                    <option disabled value="">בחר מוסד לימוד</option>
                    {universities.map((uni) => <option key={uni.universityId} value={uni.universityId}>{uni.name}</option>)}
                    </select>
                    <button className="add-btn">הוסף </button>
                    {universityError && <div className="error-message">{universityError}</div>}
                    </div>
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">פקולטה:</label>
                    <div className="input-container">
                    <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} className="course-name" name="" id="">
                        <option disabled value="">בחר פקולטה</option>
                        {faculties.map((fac) => <option key={fac.facultyId} value={fac.facultyId}>{fac.name}</option>)}
                        </select>
                        <button className="add-btn">הוסף </button>
                        {facultyError && <div className="error-message">{facultyError}</div>}
                        </div>
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">תואר:</label>
                    <div className="input-container">
                    <select value={selectedDegree} onChange={(e) => setSelectedDegree(e.target.value)} className="course-name" name="" id="">
                    <option disabled value="">בחר תואר</option>
                    {degrees.map((deg) => <option key={deg.degreeId} value={deg.degreeId}>{deg.name}</option>)}
                    </select>
                    <button className="add-btn">הוסף </button>
                    {degreeError && <div className="error-message">{degreeError}</div>}

                </div>
                </div>
                {/* <div className="add-form-item"> */}
                <div style={{display:"flex", flexDirection:"row", margin:"10px"}}>

                    <label htmlFor="course-name">קורס חובה:</label>
                    <input type="checkbox" value={isMandatory} onChange={() => setIsMandatory(mandatory => !mandatory)} name="" id="" />
                </div>

                {/* </div> */}
                <div className="back-next-container">
                    {/* <Button>חזור</Button> */}
                  <Button  onClick={handleAddCourse}>הבא</Button>
                </div>
                <Toaster />
            </form>
            
    )
}

export default AddCourseForm
