import { Link, NavLink, useNavigate } from "react-router-dom"
import { useUniversities } from "../contexts/AppContext";

export default function Navbar({setActiveScreen}) {
  const {connectedUser, setConnectedUser} = useUniversities()
  const navigate = useNavigate()

  function logout(){
    setConnectedUser(null)
    navigate("/login")
    
  }
  return (
    <div className="navbar">
      {connectedUser && <div className="navbar-user">שלום, <span style={{fontWeight:800}}>{connectedUser.email}</span> <span onClick={()=> logout()} className="logout-link">התנתק</span></div>}
      <div id="rounded-btns">
        <div className="nav-button-wrapper">
          <NavLink className='nav-link' to='universities'><span className="clickable" >מוסדות לימוד</span></NavLink>
        </div>
        <span id="line"></span>
        <div className="nav-button-wrapper">
          <NavLink className='nav-link' to='addnew/course-form'><span className="clickable">הוסף קורס</span></NavLink>
        </div>
      </div>
    </div>
  );
}
