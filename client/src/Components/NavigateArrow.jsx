export default function NavigateArrow({type}){
    return(
        <div className="arrow-wrapper">
        <img className="arrow" src={`/images/${type}.png`} alt="arrow-up" />
      </div>
    )
}