
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversities } from '../contexts/AppContext';

export default function Search() {
const [courseOptions, setCourseOptions] = useState([]);
const [inputValue, setInputValue] = useState('');
const {BASE_URL, notifyFail} = useUniversities();
const navigate = useNavigate();
    const defaultProps = {
        options: courseOptions,
        getOptionLabel: (option) => option.courseName || "",
      };

      const handleSearch = () => {

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
            setCourseOptions(courses);
        } catch (error) {
            notifyFail("התרחשה שגיאה בעת טעינת הקורסים");
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

