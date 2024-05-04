export default function ButtonsContainer({ children, label, isNotLabel }) {
  


  return (
    
    <div  className={`${isNotLabel ? "": "wrapper-label"}`}>

    {label && <label className="buttons-cont-label">{label}</label>}    
      <div className="buttons-container">
      {children}
      </div>
    </div>
  );
}
