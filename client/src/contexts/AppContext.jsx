import {createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null)


  const [newCourse, setNewCourse] = useState(null)
  const BASE_URL = `https://localhost:7204/api`;

  useEffect(function () {
    async function fetchUniversities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/Universities`);
        const data = await res.json();
        setUniversities(data);
      } catch {
        alert("there was an error loading data..");
      } finally {
        setIsLoading(false);
      }
    }
    fetchUniversities();
  }, [BASE_URL]);


  async function getFacultiesByUniversityId(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/Faculties/GetFacultiesByUniversityId/${id}`);
      const data = await res.json();
      setFaculties(data);
      console.log(data)
    } catch {
      alert("there was an error loading data..");
    } finally {
      setIsLoading(false);
    }
  }

  return <AppContext.Provider value={{universities,isLoading,currentUniversity,faculties, getFacultiesByUniversityId, selectedCourse,setSelectedCourse,newCourse,setNewCourse}}>{children}</AppContext.Provider>;
}



function useUniversities() {
    const context = useContext(AppContext);
    if (context === undefined)
      throw new Error("AppContext was used outside AppProvider");
    return context;
  }

export {AppProvider, useUniversities}
