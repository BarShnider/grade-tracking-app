import { useState } from "react"
import { useUniversities } from "../contexts/AppContext"
import Button from "./Button"
import AddCourseForm from "./AddCourseForm"
import { Outlet } from "react-router-dom"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import University from "./University"

function AddNewCourseScreen() {
    const {universities,newCourse, setNewCourse} = useUniversities()
    // console.log(newCourse)
    // console.log(newCourse.university[0].name)
    const universityInfo = newCourse && newCourse.university && newCourse.university.length > 0 ? newCourse.university[0] : null;

    return (
        <div className="course-form-container">
        <Outlet />
            <div className="course-preview">
            {universityInfo && <University univ={universityInfo} isPreview={true} />}

                {/* <span>פה יכנס אובייקט של קורס שיתווסף למערכת</span> */}
                {newCourse && <span>
                <p><span className="course-preview-title">שם הקורס: </span>{newCourse?.courseName}</p>
                <p><span className="course-preview-title">מספר הקורס: </span>{newCourse?.courseCode} </p>
                <p> <span className="course-preview-title">שם המרצה: </span> {newCourse?.lecturerName}</p>
                <p><span className="course-preview-title">מוסד לימוד: </span>{newCourse?.university[0]?.name}</p>
                <p><span className="course-preview-title">פקולטה: </span>{newCourse?.faculty[0]?.name} </p>
                <p> <span className="course-preview-title">תואר: </span> {newCourse?.degree[0]?.name}</p>
                </span>}


            </div>
        </div>
    )
}

export default AddNewCourseScreen
