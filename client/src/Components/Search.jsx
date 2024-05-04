import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversities } from '../contexts/AppContext';

export default function Search() {
const [courseOptions, setCourseOptions] = useState([]);
const [value, setValue] = useState(courseOptions[0]);
const [inputValue, setInputValue] = useState('');
const {BASE_URL} = useUniversities();
const navigate = useNavigate();
    const defaultProps = {
        options: courseOptions,
        getOptionLabel: (option) => option.courseName || "",
      };

      const handleSearch = () => {
        // Perform the search using the selected value or the typed input value
        console.log("Searching for:" ,inputValue);
        // Here you would normally trigger some navigation or fetch based on the value/inputValue
        if (inputValue.trim() !== "") {
          navigate(`search/sq-${inputValue}`)
          setInputValue("")
    }
  }
    
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

      const getAllCourses = async () => {
        try {
          const response = await fetch(`${BASE_URL}/Courses`, {
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

      // useEffect(function(){
      //   getAllCourses();
      // },[])


      const fetchCoursesByName = async (searchString) => {
        try {
            const url = `${BASE_URL}/Courses/GetAllCoursesByName/${encodeURIComponent(searchString)}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const courses = await response.json();
            console.log("Fetched courses successfully:", courses);
            setCourseOptions(courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
            alert("Failed to fetch courses");
        }
    };

    useEffect(() => {
        if (inputValue.trim() !== '') {
            fetchCoursesByName(inputValue);
        }
    }, [inputValue]); // Depend on inputValue to refetch when it changes
  return (
    <div style={{position:"absolute",top:"25px",left:"25px",display:"flex"}}>
        <div onClick={() => handleSearch()} style={{display:"flex",alignItems:"flex-end",justifyContent:"center", cursor:"pointer"}}>

  <SearchIcon />
        </div>
        <input placeholder='חיפוש קורסים...' type="text" onKeyDown={handleKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='search-box' />
    {/* <Autocomplete
    freeSolo
    sx={{width:300}}
    {...defaultProps}
    id="disable-close-on-select"
    disableCloseOnSelect
    inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
            <TextField {...params} label="חפש קורס" color='success' variant="standard" onKeyDown={handleKeyDown} />
        )}
        /> */}
        </div>
  );
}

