import { Children } from "react";

export default function Button({
  children,
  delay,
  onClick,
  selected,
  isMandatory,
}) {
  return (
    <button
      onClick={onClick}
      className={`button animate__animated animate__fadeInUp ${
        selected ? "selected-btn" : ""
      } `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
      {isMandatory && <span className="badge mandatory">חובה</span>}
      {isMandatory === false && <span className="badge not-mandatory">בחירה</span>}
    </button>
  );
}
