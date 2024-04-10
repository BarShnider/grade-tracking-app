import { Link } from "react-router-dom"

export default function University({univ}){
    const {imageUrl, location, name, universityId} = univ
    // console.log(universityId)

    return (
        <Link to={`${universityId}`} className="university-wrapper nav-link">
        <div className="university-wrapper" >
            <div className="univ-image-circle">
            {imageUrl !== "" ? <img className="univ-image" src={imageUrl} alt={name} style={{color:"black"}} /> : <span style={{color:'black', fontWeight: '800'}}>{name}</span>}
            </div>
            <span className="univ-name">{name}</span>
            <span className="univ-city">{location}</span>
        </div>
        </Link>
    )
}