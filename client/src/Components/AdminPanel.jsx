import { DataGrid } from "@mui/x-data-grid";
import { useUniversities } from "../contexts/AppContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import EditUniversitiesModal from "./EditUniversitiesModal";
import EditCourseModal from "./EditCourseModal";
import EditFacultyModal from "./EditFacultyModal";
import EditDegreeModal from "./EditDegreeModal";

function AdminPanel() {
  const { universities, BASE_URL, setUniversities } = useUniversities();
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUniversitiesModalOpen, setIsUniversitiesModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
  const [editingDegree, setEditingDegree] = useState(null);

  const univColumns = [
    { field: "universityId", headerName: "ID", width: 90 },
    {
      field: "actions",
      headerName: "פעולות",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => openUniversitiesModal(params.row)}
            aria-label="edit"
            color="secondery"
            size="small"
          >
            <EditRoundedIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => deleteUniversity(params.row.universityId)}
            aria-label="delete"
            color="secondery"
            size="small"
          >
            <DeleteIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },

    {
      field: "name",
      headerName: "שם מוסד הלימוד",
      width: 200,
      //   editable: true,
    },

    {
      field: "location",
      headerName: "מיקום",
      width: 100,
      //   editable: true,
    },
    {
      field: "website",
      headerName: "אתר",
      width: 200,
      //   editable: true,
    },
    {
      field: "imageUrl",
      headerName: "לוגו",
      width: 200,
      //   editable: true,
    },

    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];

  const courseColumns = [
    { field: "CourseId", headerName: "ID", width: 50 },
    {
      field: "actions",
      headerName: "פעולות",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => openCourseModal(params.row)}
            aria-label="edit"
            color="secondery"
            size="small"
          >
            <EditRoundedIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => deleteCourse(params.row.CourseId)}
            aria-label="delete"
            color="secondery"
            size="small"
          >
            <DeleteIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "CourseCode",
      headerName: "קוד קורס",
      width: 100,
      //   editable: true,
    },
    {
      field: "CourseName",
      headerName: "שם",
      width: 200,
      //   editable: true,
    },
    {
      field: "LecturerName",
      headerName: "שם מרצה",
      width: 150,
      //   editable: true,
    },
    {
      field: "UniversityName",
      headerName: "מוסד לימוד",
      width: 150,
      //   editable: true,
    },
    {
      field: "FacultyName",
      headerName: "פקולטה",
      width: 150,
      //   editable: true,
    },
    {
      field: "DegreeName",
      headerName: "תואר",
      width: 200,
      //   editable: true,
    },
  ];
  const facultiesColumns = [
    { field: "FacultyId", headerName: "ID", width: 50 },
    {
      field: "actions",
      headerName: "פעולות",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => openFacultyModal(params.row)}
            aria-label="edit"
            color="secondery"
            size="small"
          >
            <EditRoundedIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => deleteFaculty(params.row.FacultyId)}
            aria-label="delete"
            color="secondery"
            size="small"
          >
            <DeleteIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "Name",
      headerName: "שם",
      width: 200,
      //   editable: true,
    },
    {
      field: "UniversityName",
      headerName: "מוסד לימוד",
      width: 150,
      //   editable: true,
    },
  ];

  const degreesColumns = [
    { field: "DegreeId", headerName: "ID", width: 50 },
    {
      field: "actions",
      headerName: "פעולות",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => openDegreeModal(params.row)}
            aria-label="edit"
            color="secondery"
            size="small"
          >
            <EditRoundedIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => deleteDegree(params.row.DegreeId)}
            aria-label="delete"
            color="secondery"
            size="small"
          >
            <DeleteIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "Name",
      headerName: "שם",
      width: 200,
      //   editable: true,
    },
    {
      field: "UniversityName",
      headerName: "מוסד לימוד",
      width: 150,
      //   editable: true,
    },
    {
      field: "FacultyName",
      headerName: "פקולטה",
      width: 150,
      //   editable: true,
    },
  ];

  const userColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "actions",
      headerName: "פעולות",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => openEditModal(params.row)}
            aria-label="edit"
            color="secondery"
            size="small"
          >
            <EditRoundedIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
          <IconButton
            sx={{ width: "30px", height: "30px" }}
            onClick={() => deleteUser(params.row.id)}
            aria-label="delete"
            color="secondery"
            size="small"
          >
            <DeleteIcon
              sx={{ width: "20px", height: "20px", margin: "0px 5px" }}
            />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "מייל",
      width: 200,
      //   editable: true,
    },
    {
      field: "firstName",
      headerName: "שם פרטי",
      width: 150,
      //   editable: true,
    },
    {
      field: "lastName",
      headerName: "שם משפחה",
      width: 150,
      //   editable: true,
    },
  ];

  const getCourses = async () => {
    fetch(`${BASE_URL}/Courses/GetAllCoursesWithUniversityFacultyDegree`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };
  const getFaculties = async () => {
    fetch(`${BASE_URL}/Faculties/GetAllFacultiesWithUniversity`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        setFaculties(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  const getDegrees = async () => {
    fetch(`${BASE_URL}/Degrees/GetDegreesWithUniversityFaculty`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        setDegrees(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };
  const getUsers = async () => {
    fetch(`${BASE_URL}/User/GetAllUsers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  async function deleteUniversity(universityID) {
    try {
      const response = await fetch(`${BASE_URL}/Universities/${universityID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the university");
      }

      // Update local state or trigger a re-fetch of the data
      setUniversities(currentUniversities =>
        currentUniversities.filter(univ => univ.universityId !== universityID)
      );
    } catch (error) {
      console.error("There was an error deleting the university:", error);
      alert("There was an error deleting the university.");
    }
  }

  async function deleteUser(userId) {
    try {
      const response = await fetch(`${BASE_URL}/User/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }

      // Update local state or trigger a re-fetch of the data
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error("There was an error deleting the user:", error);
      alert("There was an error deleting the user.");
    }
  }

  async function deleteCourse(courseID) {
    try {
      const response = await fetch(`${BASE_URL}/Courses/${courseID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the course");
      }

      // Update local state or trigger a re-fetch of the data
      setCourses(currentCourses =>
        currentCourses.filter(course => course.CourseId !== courseID)
      );
    } catch (error) {
      console.error("There was an error deleting the course:", error);
      alert("There was an error deleting the course.");
    }
  }

  async function deleteDegree(degreeID) {
    try {
      const response = await fetch(`${BASE_URL}/Degrees/${degreeID}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the degree");
      }

      // Update local state or trigger a re-fetch of the data
      setDegrees(currentDegrees =>
        currentDegrees.filter(degree => degree.DegreeId !== degreeID)
      );
    } catch (error) {
      console.error("There was an error deleting the degree:", error);
      alert("There was an error deleting the degree.");
    }
  }

  async function deleteFaculty(facultyId) {
    try {
      const response = await fetch(`${BASE_URL}/Faculties/${facultyId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the degree");
      }

      // Update local state or trigger a re-fetch of the data
      setFaculties(currentFaculties =>
        currentFaculties.filter(faculty => faculty.FacultyId !== facultyId)
      );
    } catch (error) {
      console.error("There was an error deleting the degree:", error);
      alert("There was an error deleting the degree.");
    }
  }

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };
  const openUniversitiesModal = (university) => {
    setEditingUniversity(university);
    setIsUniversitiesModalOpen(true);
  };
  const openCourseModal = (course) => {
    setEditingCourse(course);
    setIsCourseModalOpen(true);
  };
  const openFacultyModal = (faculty) => {
    setEditingFaculty(faculty);
    setIsFacultyModalOpen(true);
  };
  const openDegreeModal = (degree) => {
    setEditingDegree(degree);
    setIsDegreeModalOpen(true);
  };

  useEffect(function () {
    getCourses();
    getFaculties();
    getDegrees();
    getUsers();
  }, []);

  return (
    <>
      {isUserModalOpen && editingUser && (
        <EditUserModal
          setUsers={setUsers}
          isOpen={isUserModalOpen}
          setIsUserModalOpen={setIsUserModalOpen}
          userData={editingUser}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}
      {isUniversitiesModalOpen && editingUniversity && (
        <EditUniversitiesModal
          isOpen={isUniversitiesModalOpen}
          setIsUniversitiesModalOpen={setIsUniversitiesModalOpen}
          universityData={editingUniversity}
          onClose={() => setIsUniversitiesModalOpen(false)}
        />
      )}
      {isUniversitiesModalOpen && editingUniversity && (
        <EditUniversitiesModal
          setUniversities={setUniversities}
          isOpen={isUniversitiesModalOpen}
          setIsUniversitiesModalOpen={setIsUniversitiesModalOpen}
          universityData={editingUniversity}
          onClose={() => setIsUniversitiesModalOpen(false)}
          isAddNew={false}

        />
      )}
      {isCourseModalOpen && editingCourse && (
        <EditCourseModal
          setCourses={setCourses}
          isOpen={isCourseModalOpen}
          setIsCourseModalOpen={setIsCourseModalOpen}
          courseData={editingCourse}
          onClose={() => setIsCourseModalOpen(false)}
        />
      )}
      {isFacultyModalOpen && editingFaculty && (
        <EditFacultyModal
          setFaculties={setFaculties}
          isOpen={isFacultyModalOpen}
          setIsFacultyModalOpen={setIsFacultyModalOpen}
          facultyData={editingFaculty}
          onClose={() => setIsFacultyModalOpen(false)}
          isAddNew={false}
        />
      )}
      {isDegreeModalOpen && editingDegree && (
        <EditDegreeModal
          setDegrees={setDegrees}
          isOpen={isDegreeModalOpen}
          setIsDegreeModalOpen={setIsDegreeModalOpen}
          degreeData={editingDegree}
          onClose={() => setIsDegreeModalOpen(false)}
          isAddNew={false}
        />
      )}
      <h1 style={{ textAlign: "center" }}>משתמשים</h1>
      <div className="admin-tables" style={{ width: "50%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            sx={{ backgroundColor: "#fff" }}
            rows={users}
            columns={userColumns}
            getRowId={(row) => row.id} // Custom ID getter
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            //   checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <h1 style={{ textAlign: "center" }}>מוסדות לימוד</h1>
      <div className="admin-tables">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            sx={{ backgroundColor: "#fff" }}
            rows={universities}
            columns={univColumns}
            getRowId={(row) => row.universityId} // Custom ID getter
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            //   checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <h1 style={{ textAlign: "center" }}>פקולטות</h1>
      <div className="admin-tables" style={{ width: "40%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={faculties}
            columns={facultiesColumns}
            sx={{ backgroundColor: "#fff" }}
            getRowId={(row) => row.FacultyId} // Custom ID getter
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            //   checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <h1 style={{ textAlign: "center" }}>תארים</h1>
      <div className="admin-tables" style={{ width: "50%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={degrees}
            columns={degreesColumns}
            sx={{ backgroundColor: "#fff" }}
            getRowId={(row) => row.DegreeId} // Custom ID getter
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            //   checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <h1 style={{ textAlign: "center" }}>קורסים</h1>
      <div className="admin-tables" style={{marginBottom:"100px"}}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={courses}
            columns={courseColumns}
            sx={{ backgroundColor: "#fff" }}
            getRowId={(row) => row.CourseId} // Custom ID getter
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            //   checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
     
      
    </>
  );
}

export default AdminPanel;
