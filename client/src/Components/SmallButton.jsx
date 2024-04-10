function SmallButton({ children, onClick,style }) {
  return (
    <div >
      <button onClick={onClick} style={style} className="small-btn" >{children}</button>
    </div>
  );
}

export default SmallButton;
