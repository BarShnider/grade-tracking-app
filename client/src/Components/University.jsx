import { Link } from "react-router-dom";

export default function University({ univ, isPreview }) {
  const { imageUrl, location, name, universityId } = univ;
  if (!isPreview) {
    return (
      <Link
        to={`${universityId}`}
        className={`university-wrapper nav-link ${
          isPreview ? "preview-margins" : null
        }`}
      >
        <div className={`university-wrapper`}>
          <div className="univ-image-circle">
            {imageUrl !== "" ? (
              <img
                className="univ-image"
                src={imageUrl}
                alt={name}
                style={{ color: "black" }}
              />
            ) : (
              <span style={{ color: "black", fontWeight: "800" }}>{name}</span>
            )}
          </div>
          <span className="univ-name">{name}</span>
          <span className="univ-city">{location}</span>
        </div>
      </Link>
    );
  }
  else if(isPreview){
    return(
        <div className={`university-wrapper`}>
        <div className="univ-image-circle">
          {imageUrl !== "" ? (
            <img
              className="univ-image"
              src={imageUrl}
              alt={name}
              style={{ color: "black" }}
            />
          ) : (
            <span style={{ color: "black", fontWeight: "800" }}>{name}</span>
          )}
        </div>
        <span className="univ-name">{name}</span>
        <span className="univ-city">{location}</span>
      </div>
    )

  }
}
