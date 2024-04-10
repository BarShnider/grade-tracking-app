import { useState } from "react"
import Button from "./Button"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useUniversities } from "../contexts/AppContext"

function AddCourseForm({handleNewCourse}) {
    const {newCourse, setNewCourse} = useUniversities()
    const [courseName,setCourseName] = useState("")
    const [courseCode,setCourseCode] = useState("")
    const [lecturerName,setLecturerName] = useState("")
    const [avgGrade,setAvgGrade] = useState(0)
    const [minGrade,setMinGrade] = useState(0)
    const [maxGrade,setMaxGrade] = useState(0)
    const navigate = useNavigate();

    function handleAddCourse(e){
        e.preventDefault()
        const newAddedCourse = {
            courseName,
            courseCode : Number(courseCode),
            lecturerName,
            avgGrade,
            minGrade,
            maxGrade,
        }

        if( courseName !== "" && courseCode !== "" && lecturerName !== "" && avgGrade !== "" && minGrade !== "" && maxGrade !== ""){
            setNewCourse(newAddedCourse);
            navigate("/addnew/dest-form")
        }
        else {
            alert("need to fill stuff")
        }

        console.log(newCourse)
    }

    return (
            <form className="add-form">
                <div className="add-form-item">
                    <label htmlFor="course-name">שם קורס:</label>
                    <input type="text" onChange={(e) => setCourseName(e.target.value)} className="course-name" placeholder="לדוג': מבוא למדעי המחשב"/>
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">מספר קורס:</label>
                    <input className="course-name" type="text" onChange={(e) => setCourseCode(e.target.value)} />
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">שם המרצה:</label>
                    <input className="course-name" type="text" onChange={(e) => setLecturerName(e.target.value)} />
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">ממוצע קורס:</label>
                    <input className="course-name" type="number" onChange={(e) => setAvgGrade(e.target.value)} min='0' max='100' />

                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">ציון הכי גבוה:</label>
                    <input className="course-name" type="number" onChange={(e) => setMaxGrade(e.target.value)} min='0' max='100' />
                    
                </div>
                <div className="add-form-item">
                    <label htmlFor="course-name">ציון הכי נמוך:</label>
                    <input className="course-name" type="number" onChange={(e) => setMinGrade(e.target.value)} min='0' max='100' />
                </div>
                <div className="back-next-container">
                    {/* <Button>חזור</Button> */}
                  <Button  onClick={handleAddCourse}>הבא</Button>
                </div>
            </form>
    )
}

export default AddCourseForm
