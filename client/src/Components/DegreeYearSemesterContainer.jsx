import { useEffect } from "react";
import { useState } from "react";
import 'animate.css';

export default function DegreeYearSemesterContainer({children}){



    const [animate, setAnimate] = useState(false);

    // useEffect(() => {

    //   setAnimate(true);

    // }, []);

   
    return (
        <div className={`deg-year-semster-container ${animate ? 'animate__animated animate__slideInUp' : ''}`}>
            {children}
        </div>
    )
}