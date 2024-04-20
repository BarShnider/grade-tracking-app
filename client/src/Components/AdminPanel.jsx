import { DataGrid } from "@mui/x-data-grid";
import { useUniversities } from "../contexts/AppContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";

import { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import EditUniversitiesModal from "./EditUniversitiesModal";
import EditCourseModal from "./EditCourseModal";
const BASE_URL = `https://localhost:7204/api`;

function AdminPanel() {
  const { universities } = useUniversities();
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUniversitiesModalOpen,setIsUniversitiesModalOpen] = useState(false)
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [isCourseModalOpen,setIsCourseModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null);

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
            onClick={() => console.log(params.row)}
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
            onClick={() => console.log(params.row)}
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
            onClick={() => console.log("clicked edit", params.row)}
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
            onClick={() => console.log(params.row)}
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
            onClick={() => console.log("clicked edit", params.row)}
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
            onClick={() => console.log(params.row)}
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
          isOpen={isUniversitiesModalOpen}
          setIsUniversitiesModalOpen={setIsUniversitiesModalOpen}
          universityData={editingUniversity}
          onClose={() => setIsUniversitiesModalOpen(false)}
        />
      )}
      {isCourseModalOpen && editingCourse && (
        <EditCourseModal
          isOpen={isCourseModalOpen}
          setIsCourseModalOpen={setIsCourseModalOpen}
          courseData={editingCourse}
          onClose={() => setIsCourseModalOpen(false)}
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
      <h1 style={{ textAlign: "center" }}>קורסים</h1>
      <div className="admin-tables">
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
    </>
  );
}

export default AdminPanel;
