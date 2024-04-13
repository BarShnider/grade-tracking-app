import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UniversitySelectionScreen from "./Components/UniversitySelectionScreen";
import DegreeYearSemesterScreen from "./Components/DegreeYearSemesterScreen";
import CourseSelectionScreen from "./Components/CourseSelectionScreen";
import { AppProvider, useUniversities } from "./contexts/AppContext";
import FacultiesScreen from "./Components/FacultiesScreen";
import AddNewCourseScreen from "./Components/AddNewCourseScreen";
import AddCourseForm from "./Components/AddCourseForm";
import CourseDestinationForm from "./Components/CourseDestinationForm";
import LoginScreen from "./Components/LoginScreen";
import Register from "./Components/Register";
import { useEffect } from "react";

function App() {

  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Navigate replace to="universities" />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<Register />} />


            <Route
              path="universities"
              element={<UniversitySelectionScreen />}
            />
            <Route path="universities/:id" element={<FacultiesScreen />} />
            <Route
              path="universities/:id/faculties/:facId"
              element={<DegreeYearSemesterScreen />}
            />
            <Route
              path="universities/:id/faculties/:facId/next/:num"
              element={<CourseSelectionScreen />}
            />
            <Route path="addnew" element={<AddNewCourseScreen />}>
              <Route path="course-form" element={<AddCourseForm />} />
              <Route path="dest-form" element={<CourseDestinationForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
