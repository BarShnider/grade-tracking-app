import {createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

function AppProvider({ children }) {
  
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [connectedUser, setConnectedUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true);  // Default to true to assume loading initially
  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text)



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
        notifyFail("there was an error loading data..");
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
      notifyFail("there was an error loading data..");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const loadConnectedUser = () => {
      try {
        const storedUser = localStorage.getItem("connectedUser");
        if (storedUser) {
          setConnectedUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to retrieve user:", error);
      }
      setLoadingUser(false);  // Set loading to false after attempting to load user
    };

    loadConnectedUser();
  }, []);

  useEffect(() => {
    if (connectedUser) {
      localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
    } else {
      localStorage.removeItem("connectedUser");
    }
  }, [connectedUser]);

  return <AppContext.Provider value={{BASE_URL,universities,setUniversities,isLoading,loadingUser,currentUniversity,faculties, getFacultiesByUniversityId, selectedCourse,setSelectedCourse,newCourse,setNewCourse,connectedUser, setConnectedUser, notifySuccess, notifyFail}}>{children}</AppContext.Provider>;
}



function useUniversities() {
    const context = useContext(AppContext);
    if (context === undefined)
      throw new Error("AppContext was used outside AppProvider");
    return context;
  }

export {AppProvider, useUniversities}
