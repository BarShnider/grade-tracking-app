import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useUniversities } from '../contexts/AppContext';
import { useEffect, useState } from 'react';
const BASE_URL = `https://localhost:7204/api`;




const univColumns = [
    { field: 'universityId', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'שם מוסד הלימוד',
      width: 200,
    //   editable: true,
    },
    {
        field: 'location',
        headerName: 'מיקום',
        width: 100
      //   editable: true,
      },
    {
        field: 'website',
        headerName: 'אתר',
        width: 200,
      //   editable: true,
      },
    {
        field: 'imageUrl',
        headerName: 'לוגו',
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
    { field: 'CourseId', headerName: 'ID', width: 90 },
    {
      field: 'CourseCode',
      headerName: 'קוד קורס',
      width: 200,
    //   editable: true,
    },
    {
        field: 'CourseName',
        headerName: 'שם',
        width: 200
      //   editable: true,
      },
    {
        field: 'LecturerName',
        headerName: 'שם מרצה',
        width: 200,
      //   editable: true,
      },
    {
        field: 'UniversityName',
        headerName: 'מוסד לימוד',
        width: 200,
      //   editable: true,
      },
    {
        field: 'FacultyName',
        headerName: 'פקולטה',
        width: 200,
      //   editable: true,
      },
    {
        field: 'DegreeName',
        headerName: 'תואר',
        width: 200,
      //   editable: true,
      },
  ];
  


function AdminPanel() {
    const {universities} = useUniversities();
    const [courses, setCourses] = useState([]);
    
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
        .finally(() => {
        });
    }

    useEffect(function(){
        getCourses();
    },[])

    return (<>
    
        <h1 style={{textAlign:"center"}}>מוסדות לימוד</h1>
        <div className='admin-tables' >
        <Box sx={{ height: 400, width: '100%', }}>
        <DataGrid
        sx={{backgroundColor:"#fff"}}
          rows={universities}
          columns={univColumns}
          getRowId={(row) => row.universityId}  // Custom ID getter

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
      <h1 style={{textAlign:"center"}}>קורסים</h1>
        <div className='admin-tables' >
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={courses}
          columns={courseColumns}
          sx={{backgroundColor:"#fff"}}
          getRowId={(row) => row.CourseId}  // Custom ID getter

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
    )
}

export default AdminPanel
