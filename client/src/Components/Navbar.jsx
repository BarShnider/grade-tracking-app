import { Link, NavLink, useNavigate } from "react-router-dom"
import { useUniversities } from "../contexts/AppContext";
import { useEffect } from "react";
import MenuNavbar from "./MenuNavbar";
import Search from "./Search";

export default function Navbar({setActiveScreen}) {
  const {connectedUser, setConnectedUser} = useUniversities()
  const navigate = useNavigate()

  function logout(){
    setConnectedUser(null)
    navigate("/login")
    
  }

  


  if(connectedUser){

    return (
      <div className="navbar">
        {/* {connectedUser && <div className="navbar-user">שלום, <span style={{fontWeight:800}}>{connectedUser.email}</span> <span onClick={()=> logout()} className="logout-link">התנתק</span></div>} */}
        {connectedUser && <MenuNavbar />}
        {!connectedUser && <div className="navbar-user"><span onClick={() => navigate("login")} className="logout-link">התחברות</span>/<span onClick={() => navigate("/register")} className="logout-link">הרשמה</span></div>}
        <div id="rounded-btns">
          <div className="nav-button-wrapper">
            <NavLink className='nav-link' to='universities'><span className="clickable" >מוסדות לימוד</span></NavLink>
          </div>
          <span id="line"></span>
          <div className="nav-button-wrapper">
            <NavLink className='nav-link' to='addnew/course-form'><span className="clickable">הוסף קורס</span></NavLink>
          </div>
        </div>
        <Search />
      </div>
    );
  }
  else{
    return (<div style={{textAlign:"center",margin: "20px 0px"}}>
      <img style={{width:"100px"}} src="/images/logo.png" alt="" />
    </div>)
  }
}
