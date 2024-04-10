import Button from "./Button";
import ButtonsContainer from "./ButtonsContainer";
import CourseDetails from "./CourseDetails";
import CourseList from "./CourseList";
import { useParams } from "react-router-dom";

// react-circular-progressbar  DOWNLOAD AND TRY!

export default function CourseContainer(){
    return (
        <div className="course-container ">
            <CourseList />
            <CourseDetails />
            

        </div>
    )
}