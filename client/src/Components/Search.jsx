import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

export default function Search() {
const [courseOptions, setCourseOptions] = useState([]);
const [value, setValue] = useState(courseOptions[0]);
const [inputValue, setInputValue] = useState('');
    const defaultProps = {
        options: courseOptions,
        getOptionLabel: (option) => option.courseName,
      };

      const handleSearch = () => {
        // Perform the search using the selected value or the typed input value
        console.log("Searching for:", value ? value.courseId : inputValue);
        // Here you would normally trigger some navigation or fetch based on the value/inputValue
    };
    
      const getAllCourses = async () => {
        const BASE_URL = 'https://localhost:7204/api/Courses'; // Adjust the base URL based on your actual API URL
        try {
          const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const courses = await response.json(); // Parses JSON response into native JavaScript objects
          console.log("Fetched all courses successfully:", courses);
          setCourseOptions(courses)
          return courses; // Return the list of courses or handle it as needed
        } catch (error) {
          console.error("Error fetching all courses:", error);
          alert("Failed to fetch courses");
          return []; // Return an empty array or handle the error appropriately
        }
      };

      useEffect(function(){
        getAllCourses();
      },[])

  return (
    <div style={{position:"absolute",top:"8px",left:"25px",display:"flex"}}>
        <div onClick={() => handleSearch()} style={{display:"flex",alignItems:"flex-end",justifyContent:"center", cursor:"pointer"}}>

  <SearchIcon />
        </div>
    <Autocomplete
    sx={{width:300}}
    {...defaultProps}
    id="disable-close-on-select"
    disableCloseOnSelect
    onChange={(event, newValue) => {
        setValue(newValue);
    }}
    inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
            <TextField {...params} label="חפש קורס" color='success' variant="standard" />
        )}
        
        />
        </div>
  );
}

