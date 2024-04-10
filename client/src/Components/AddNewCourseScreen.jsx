import { useState } from "react"
import { useUniversities } from "../contexts/AppContext"
import Button from "./Button"
import AddCourseForm from "./AddCourseForm"
import { Outlet } from "react-router-dom"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"

function AddNewCourseScreen() {
    const {universities,newCourse, setNewCourse} = useUniversities()
    return (
        <div className="course-form-container">
        <Outlet />
            <div className="course-preview">
                
                {/* <span>פה יכנס אובייקט של קורס שיתווסף למערכת</span> */}
                {newCourse && <span>
                <p><span className="course-preview-title">שם הקורס: </span>{newCourse?.courseName}</p>
                <p><span className="course-preview-title">מספר הקורס: </span>{newCourse?.courseCode} </p>
                <p> <span className="course-preview-title">שם המרצה: </span> {newCourse?.lecturerName}</p>
                </span>}

            {newCourse && <div className="circles-container" style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>

                <div className="preview-circle-item">
                <CircularProgressbarWithChildren value={newCourse.avgGrade} >
            <div style={{ fontSize: 12, marginTop: -5 }}>
                <strong>{newCourse.avgGrade}</strong>
              </div>
              <div style={{ fontSize: 10, marginTop: -5 }}>
                <strong>ממוצע קורס</strong> 
              </div>
            </CircularProgressbarWithChildren>
                </div>
                <div className="preview-circle-item">
                <CircularProgressbarWithChildren value={newCourse.minGrade} >
            <div style={{ fontSize: 12, marginTop: -5 }}>
                <strong>{newCourse.minGrade}</strong>
              </div>
              <div style={{ fontSize: 10, marginTop: -5 }}>
                <strong>הכי נמוך</strong> 
              </div>
            </CircularProgressbarWithChildren>
                </div>
                <div className="preview-circle-item">
                <CircularProgressbarWithChildren value={newCourse.maxGrade} >
            <div style={{ fontSize: 12, marginTop: -5 }}>
                <strong>{newCourse.maxGrade}</strong>
              </div>
              <div style={{ fontSize: 10, marginTop: -5 }}>
                <strong>הכי גבוה</strong> 
              </div>
            </CircularProgressbarWithChildren>
                </div>
            </div>}

            </div>
        </div>
    )
}

export default AddNewCourseScreen
