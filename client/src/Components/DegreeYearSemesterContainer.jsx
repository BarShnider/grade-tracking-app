import { useState } from "react";
import 'animate.css';

export default function DegreeYearSemesterContainer({children}){
    const [animate, setAnimate] = useState(false);
    
    return (
        <div className={`deg-year-semster-container ${animate ? 'animate__animated animate__slideInUp' : ''}`}>
            {children}
        </div>
    )
}