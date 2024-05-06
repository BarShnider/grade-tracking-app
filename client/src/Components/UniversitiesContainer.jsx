import University from "./University";
import { useEffect } from "react";
import { useState } from "react";
import "animate.css";
import { useUniversities } from "../contexts/AppContext";
import Loader from "./Loader";
export default function UniversitiesContainer() {
  const [animate, setAnimate] = useState(false);
  const {universities, isLoading} = useUniversities()
  useEffect(() => {
    setAnimate(true);
  }, []);

  if(isLoading) return <Loader />
  return (
    <div
      className={`universities-container ${
        animate ? "animate__animated animate__fadeIn" : ""
      }`}
    >
      {universities.map((univ) => (
        <University
          key={univ.universityId}
          univ={univ}
        />
      ))}

    </div>
  );
}
