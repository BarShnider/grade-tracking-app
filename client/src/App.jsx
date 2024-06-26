import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UniversitySelectionScreen from "./Components/UniversitySelectionScreen";
import DegreeYearSemesterScreen from "./Components/DegreeYearSemesterScreen";
import CourseSelectionScreen from "./Components/CourseSelectionScreen";
import { AppProvider } from "./contexts/AppContext";
import AddNewCourseScreen from "./Components/AddNewCourseScreen";
import AddCourseForm from "./Components/AddCourseForm";
import LoginScreen from "./Components/LoginScreen";
import Register from "./Components/Register";
import EditDetails from "./Components/EditDetails";
import AdminPanel from "./Components/AdminPanel";
import { Toaster } from "react-hot-toast";
import ForgotPassModal from "./Components/ForgotPassModal";

function App() {
  return (
    <>
      <AppProvider>
        <HashRouter>
          <Toaster />
          <Navbar />
          <Routes>
            <Route index element={<Navigate replace to="universities" />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<Register />} />
            <Route path="edit" element={<EditDetails />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="forgot-password" element={<ForgotPassModal />} />
            <Route
              path="universities"
              element={<UniversitySelectionScreen />}
            />
            <Route
              path="universities/:id"
              element={<DegreeYearSemesterScreen />}
            />
            <Route
              path="universities/:id/faculties/:facId"
              element={<DegreeYearSemesterScreen />}
            />
            <Route
              path="universities/:id/next/:num"
              element={<CourseSelectionScreen />}
            />
            <Route path="search/:num" element={<CourseSelectionScreen />} />
            <Route path="addnew" element={<AddNewCourseScreen />}>
              <Route path="course-form" element={<AddCourseForm />} />
            </Route>
          </Routes>
        </HashRouter>
      </AppProvider>
    </>
  );
}

export default App;
