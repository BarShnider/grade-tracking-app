import { NavLink } from "react-router-dom";

export default function Navbar({setActiveScreen}) {
  return (
    <div className="navbar">
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
